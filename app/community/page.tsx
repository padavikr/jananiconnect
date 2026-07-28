"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircle, Send, Share2, Sparkles, Users, MessageSquareText, Search, ShieldCheck, Loader2 } from "lucide-react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, updateDoc, doc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/components/auth/AuthProvider";

type CommunityPost = {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  content: string;
  category: string;
  createdAt?: { toDate?: () => Date } | null;
  likes: number;
  commentsCount: number;
};

type CommunityComment = {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt?: { toDate?: () => Date } | null;
};

type CategoryOption = {
  name: string;
  value: string;
};

const categories: CategoryOption[] = [
  { name: "Pregnancy", value: "Pregnancy" },
  { name: "Nutrition", value: "Nutrition" },
  { name: "Baby Care", value: "Baby Care" },
  { name: "Mental Health", value: "Mental Health" },
  { name: "Exercise", value: "Exercise" },
  { name: "Medicines", value: "Medicines" },
  { name: "Government Schemes", value: "Government Schemes" },
  { name: "General", value: "General" },
];

const abusiveWords = ["idiot", "stupid", "fool", "damn", "hate", "kill", "shit"];

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, CommunityComment[]>>({});
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [commentLoading, setCommentLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const q = query(collection(db, "community_posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<CommunityPost, "id">),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      setCommentsMap({});
      return;
    }

    const unsubscribes = posts.map((post) =>
      onSnapshot(query(collection(db, "community_comments"), where("postId", "==", post.id), orderBy("createdAt", "asc")), (snapshot) => {
        const comments = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<CommunityComment, "id">),
        }));
        setCommentsMap((prev) => ({ ...prev, [post.id]: comments }));
      })
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = `${post.userName} ${post.content}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filter === "All" || post.category === filter;
      return matchesSearch && matchesCategory;
    });
  }, [filter, posts, search]);

  const totalMembers = useMemo(() => {
    const uniqueMembers = new Set(posts.map((post) => post.userId));
    return uniqueMembers.size;
  }, [posts]);

  const totalComments = useMemo(() => {
    return Object.values(commentsMap).reduce((sum, comments) => sum + comments.length, 0);
  }, [commentsMap]);

  const trendingTopics = useMemo(() => {
    const counts = posts.reduce<Record<string, number>>((map, post) => {
      map[post.category] = (map[post.category] || 0) + 1;
      return map;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, count]) => ({ name, count }));
  }, [posts]);

  const handleCreatePost = async () => {
    if (!user) {
      setError("Please sign in to join the community.");
      return;
    }

    const cleaned = newPost.trim();
    if (!cleaned) {
      setError("Please write something before posting.");
      return;
    }

    const hasAbuse = abusiveWords.some((word) => cleaned.toLowerCase().includes(word));
    if (hasAbuse) {
      setError("This post violates community guidelines.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "community_posts"), {
        userId: user.uid,
        userName: user.displayName || "Anonymous Mother",
        userRole: user.email?.includes("asha") ? "ASHA Worker" : user.email?.includes("doctor") ? "Doctor" : "Pregnant Woman",
        content: cleaned,
        category,
        createdAt: serverTimestamp(),
        likes: 0,
        commentsCount: 0,
      });

      setNewPost("");
      setCategory("General");
    } catch (err) {
      console.error(err);
      setError("Unable to post right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    const postRef = doc(db, "community_posts", postId);
    await updateDoc(postRef, { likes: increment(1) });
  };

  const handleAddComment = async (postId: string) => {
    const comment = (commentDrafts[postId] || "").trim();
    if (!comment || !user) return;

    setCommentLoading((prev) => ({ ...prev, [postId]: true }));

    try {
      await addDoc(collection(db, "community_comments"), {
        postId,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        comment,
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "community_posts", postId), { commentsCount: increment(1) });
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.12),_transparent_24%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-3 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[32px] border border-pink-100 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 p-6 text-white shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
                <Sparkles size={16} />
                Community Circle
              </div>
              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Community</h1>
              <p className="mt-2 max-w-2xl text-sm text-pink-50 sm:text-base">Learn, Share and Support Every Mother.</p>
            </div>
            <div className="rounded-[24px] border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-pink-100">Today&apos;s active members</p>
              <p className="mt-2 text-3xl font-bold">{posts.length + 3}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[28px] border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
            <div className="flex items-center gap-2 text-pink-700">
              <MessageSquareText size={18} />
              <h2 className="text-lg font-semibold">Share your experience...</h2>
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share a helpful tip, ask a question, or support another mother..."
              className="mt-4 min-h-[120px] w-full rounded-[20px] border border-pink-200 bg-pink-50/70 p-3 text-sm outline-none focus:border-pink-400"
            />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-full border border-pink-200 bg-white px-3 py-2 text-sm text-gray-700"
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleCreatePost}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Post
              </button>
            </div>
            {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
          </div>

          <div className="space-y-4 rounded-[28px] border border-violet-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
            <div className="flex items-center gap-2 text-violet-700">
              <ShieldCheck size={18} />
              <h2 className="font-semibold">Community Highlights</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[20px] border border-pink-100 bg-pink-50 p-3">
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="mt-1 text-2xl font-bold text-pink-700">{posts.length}</p>
              </div>
              <div className="rounded-[20px] border border-violet-100 bg-violet-50 p-3">
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="mt-1 text-2xl font-bold text-violet-700">{totalMembers || posts.length}</p>
              </div>
              <div className="rounded-[20px] border border-emerald-100 bg-emerald-50 p-3">
                <p className="text-sm text-gray-600">Total Comments</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{totalComments}</p>
              </div>
            </div>
            <div className="rounded-[20px] border border-pink-100 bg-pink-50/60 p-3">
              <p className="text-sm font-semibold text-pink-700">Trending topics</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <span key={topic.name} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-pink-700 shadow-sm">
                    #{topic.name} · {topic.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-pink-700">Community Feed</h2>
              <p className="text-sm text-gray-600">Newest posts first</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-2 text-sm text-gray-700">
                <Search size={16} className="text-pink-600" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts"
                  className="w-full bg-transparent outline-none"
                />
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-full border border-pink-200 bg-white px-3 py-2 text-sm text-gray-700"
              >
                <option value="All">All Categories</option>
                {categories.map((categoryItem) => (
                  <option key={categoryItem.value} value={categoryItem.value}>
                    {categoryItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-pink-200 bg-pink-50/80 p-8 text-center text-sm text-gray-600">
                <p className="font-semibold text-pink-700">No community posts yet.</p>
                <p className="mt-2">Be the first to support another mother ❤️</p>
              </div>
            ) : null}

            {filteredPosts.map((post) => {
              const comments = commentsMap[post.id] || [];
              const avatar = (post.userName || "A").charAt(0).toUpperCase();
              return (
                <div key={post.id} className="rounded-[24px] border border-pink-100 bg-gradient-to-br from-white to-pink-50/70 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 font-semibold text-white">
                        {avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{post.userName}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-pink-100 px-2.5 py-1 text-[11px] font-semibold text-pink-700">{post.userRole}</span>
                          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">{post.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleString() : "Just now"}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-700">{post.content}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-pink-100 pt-3">
                    <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-700">
                      <Heart size={16} /> {post.likes}
                    </button>
                    <button onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)} className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
                      <MessageCircle size={16} /> {post.commentsCount}
                    </button>
                    <button className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                      <Share2 size={16} /> Share
                    </button>
                  </div>

                  {expandedPostId === post.id ? (
                    <div className="mt-4 rounded-[20px] border border-pink-100 bg-white p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-pink-700">
                        <MessageCircle size={16} /> Comments
                      </div>
                      <div className="mt-3 space-y-2">
                        {comments.length === 0 ? (
                          <p className="text-sm text-gray-500">No comments yet. Be the first to support.</p>
                        ) : null}
                        {comments.map((comment) => (
                          <div key={comment.id} className="rounded-2xl bg-pink-50 px-3 py-2 text-sm text-gray-700">
                            <p className="font-semibold text-pink-700">{comment.userName}</p>
                            <p className="mt-1">{comment.comment}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <input
                          value={commentDrafts[post.id] || ""}
                          onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          placeholder="Write a comment..."
                          className="flex-1 rounded-full border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={commentLoading[post.id]}
                          className="rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-3 py-2 text-sm font-semibold text-white"
                        >
                          {commentLoading[post.id] ? <Loader2 size={16} className="animate-spin" /> : "Comment"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
