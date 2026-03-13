import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, ExternalLink, Loader2, ShieldCheck, LogOut, ScrollText, Gift, Users, MessageSquare, Send } from "lucide-react";

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  referral_code: string;
  payment_screenshot_url: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  profiles?: { full_name: string; email: string; phone: string } | null;
}

const AdminDashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"subscriptions" | "audit" | "referrals" | "whatsapp">("subscriptions");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [waMessage, setWaMessage] = useState("");
  const [waRecipients, setWaRecipients] = useState<string>("all");
  const [waCustomNumbers, setWaCustomNumbers] = useState("");
  const [waSending, setWaSending] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (data && data.length > 0) {
        setIsAdmin(true);
        fetchSubscriptions();
      } else {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const fetchSubscriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load subscriptions");
      setLoading(false);
      return;
    }

    // Fetch profile info for each subscription
    if (data && data.length > 0) {
      const userIds = [...new Set(data.map((s) => s.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email, phone")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));
      const enriched = data.map((s) => ({
        ...s,
        profiles: profileMap.get(s.user_id) || null,
      }));
      setSubscriptions(enriched);
    } else {
      setSubscriptions([]);
    }
    setLoading(false);
  };

  const handleAction = async (id: string, status: "approved" | "rejected", plan: string) => {
    setActionLoading(id);
    try {
      const updateData: any = { status };
      if (status === "approved") {
        const months = plan === "6_months" ? 6 : 12;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + months);
        updateData.approved_at = new Date().toISOString();
        updateData.expires_at = expiresAt.toISOString();
      }

      const { error } = await supabase.from("subscriptions").update(updateData).eq("id", id);
      if (error) throw error;

      toast.success(`Subscription ${status}!`);
      fetchSubscriptions();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getScreenshotUrl = async (path: string) => {
    const { data } = await supabase.storage.from("payment-screenshots").createSignedUrl(path, 300);
    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  };

  const fetchAuditLogs = async () => {
    setAuditLoading(true);
    const { data, error } = await supabase
      .from("audit_logs" as any)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (!error && data) setAuditLogs(data);
    setAuditLoading(false);
  };

  const fetchReferrals = async () => {
    setReferralsLoading(true);
    // Get all referral codes with their tracking data
    const { data: codes } = await (supabase
      .from("referral_codes" as any)
      .select("*") as any);

    if (codes && codes.length > 0) {
      const userIds = codes.map((c: any) => c.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      const { data: tracking } = await (supabase
        .from("referral_tracking" as any)
        .select("*") as any);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));
      const enriched = codes.map(c => {
        const userTracking = tracking?.filter(t => t.referrer_user_id === c.user_id) || [];
        const purchasedCount = userTracking.filter(t => t.purchased).length;
        return {
          ...c,
          profile: profileMap.get(c.user_id),
          totalReferrals: userTracking.length,
          purchasedReferrals: purchasedCount,
          rewardEligible: purchasedCount >= 5,
          rewardClaimed: userTracking.some(t => t.reward_claimed),
        };
      });
      setReferrals(enriched);
    }
    setReferralsLoading(false);
  };

  const sendWhatsApp = async () => {
    if (!waMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    setWaSending(true);
    try {
      let numbers: string[] = [];
      if (waRecipients === "all") {
        // Get all user phone numbers
        const { data: profiles } = await supabase.from("profiles").select("phone");
        numbers = profiles?.map(p => p.phone).filter(Boolean) || [];
      } else if (waRecipients === "subscribed") {
        const { data: subs } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("status", "approved");
        if (subs && subs.length > 0) {
          const userIds = [...new Set(subs.map(s => s.user_id))];
          const { data: profiles } = await supabase
            .from("profiles")
            .select("phone, user_id")
            .in("user_id", userIds);
          numbers = profiles?.map(p => p.phone).filter(Boolean) || [];
        }
      } else {
        numbers = waCustomNumbers.split(",").map(n => n.trim()).filter(Boolean);
      }

      if (numbers.length === 0) {
        toast.error("No recipients found");
        setWaSending(false);
        return;
      }

      // Format numbers with country code if missing
      const formatted = numbers.map(n => {
        const clean = n.replace(/\D/g, "");
        return clean.startsWith("91") ? `+${clean}` : `+91${clean}`;
      });

      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("send-whatsapp", {
        body: { to: formatted, message: waMessage },
      });

      if (res.error) throw res.error;
      const results = res.data?.results || [];
      const sent = results.filter((r: any) => r.success).length;
      const failed = results.filter((r: any) => !r.success).length;
      toast.success(`WhatsApp sent: ${sent} delivered, ${failed} failed`);
      setWaMessage("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send WhatsApp messages");
    } finally {
      setWaSending(false);
    }
  };

  const filtered = filter === "all" ? subscriptions : subscriptions.filter((s) => s.status === filter);

  const actionColors: Record<string, string> = {
    login_verified: "text-green-500",
    login_blocked_session: "text-yellow-500",
    login_blocked_device: "text-yellow-500",
    logout: "text-muted-foreground",
    force_logout: "text-orange-500",
    password_reset: "text-destructive",
    payment_duplicate_blocked: "text-destructive",
    payment_submitted: "text-green-500",
    rate_limited: "text-destructive",
  };

  if (!isAdmin && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <ShieldCheck className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground text-sm mt-2">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h1 className="font-display text-lg font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "subscriptions" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("subscriptions")}
            className="text-xs"
          >
            <ShieldCheck className="w-3 h-3 mr-1" /> Subscriptions
          </Button>
          <Button
            variant={activeTab === "audit" ? "default" : "outline"}
            size="sm"
            onClick={() => { setActiveTab("audit"); if (auditLogs.length === 0) fetchAuditLogs(); }}
            className="text-xs"
          >
            <ScrollText className="w-3 h-3 mr-1" /> Audit Logs
          </Button>
          <Button
            variant={activeTab === "referrals" ? "default" : "outline"}
            size="sm"
            onClick={() => { setActiveTab("referrals"); if (referrals.length === 0) fetchReferrals(); }}
            className="text-xs"
          >
            <Gift className="w-3 h-3 mr-1" /> Referrals
          </Button>
          <Button
            variant={activeTab === "whatsapp" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("whatsapp")}
            className="text-xs"
          >
            <MessageSquare className="w-3 h-3 mr-1" /> WhatsApp
          </Button>
        </div>

        {activeTab === "subscriptions" ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total", count: subscriptions.length, color: "text-foreground" },
                { label: "Pending", count: subscriptions.filter((s) => s.status === "pending").length, color: "text-yellow-500" },
                { label: "Approved", count: subscriptions.filter((s) => s.status === "approved").length, color: "text-green-500" },
                { label: "Rejected", count: subscriptions.filter((s) => s.status === "rejected").length, color: "text-destructive" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {["all", "pending", "approved", "rejected"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className="capitalize text-xs"
                >
                  {f}
                </Button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No subscriptions found.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((sub) => (
                  <div key={sub.id} className="glass-card p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-display font-semibold text-foreground truncate">
                            {sub.profiles?.full_name || "Unknown User"}
                          </p>
                          <Badge
                            variant={sub.status === "approved" ? "default" : sub.status === "rejected" ? "destructive" : "secondary"}
                            className="text-[10px]"
                          >
                            {sub.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                            {sub.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {sub.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                            {sub.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>{sub.profiles?.email} · {sub.profiles?.phone}</p>
                          <p>
                            Plan: <span className="text-foreground">{sub.plan === "6_months" ? "6 Months (₹299)" : sub.plan === "12_months" ? "12 Months (₹499)" : sub.plan === "3_months" ? "3 Months (₹999)" : "Live ATC (₹499)"}</span>
                            {" · "}₹{sub.amount}
                            {" · "}Referral: <span className="text-primary">{sub.referral_code}</span>
                          </p>
                          <p>Submitted: {new Date(sub.created_at).toLocaleDateString()}</p>
                          {sub.expires_at && <p>Expires: {new Date(sub.expires_at).toLocaleDateString()}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => getScreenshotUrl(sub.payment_screenshot_url)}
                          className="text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> Screenshot
                        </Button>
                        {sub.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleAction(sub.id, "approved", sub.plan)}
                              disabled={actionLoading === sub.id}
                              className="text-xs bg-green-600 hover:bg-green-700"
                            >
                              {actionLoading === sub.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleAction(sub.id, "rejected", sub.plan)}
                              disabled={actionLoading === sub.id}
                              className="text-xs"
                            >
                              <XCircle className="w-3 h-3 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : activeTab === "audit" ? (
          /* Audit Logs Tab */
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm font-bold text-foreground">Recent Security Events</h2>
              <Button variant="outline" size="sm" onClick={fetchAuditLogs} disabled={auditLoading} className="text-xs">
                {auditLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                Refresh
              </Button>
            </div>

            {auditLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : auditLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No audit logs yet.</p>
            ) : (
              <div className="space-y-2">
                {auditLogs.map((log: any) => (
                  <div key={log.id} className="glass-card p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-xs font-bold uppercase ${actionColors[log.action] || "text-foreground"}`}>
                            {log.action.replace(/_/g, " ")}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {log.user_id ? `User: ${log.user_id.slice(0, 8)}...` : "Anonymous"}
                          {log.ip_address ? ` · IP: ${log.ip_address}` : ""}
                        </p>
                        {log.details && Object.keys(log.details).length > 0 && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                            {JSON.stringify(log.details).slice(0, 100)}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : activeTab === "referrals" ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm font-bold text-foreground">Referral Program</h2>
              <Button variant="outline" size="sm" onClick={fetchReferrals} disabled={referralsLoading} className="text-xs">
                {referralsLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                Refresh
              </Button>
            </div>

            {referralsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : referrals.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No referral codes generated yet.</p>
            ) : (
              <div className="space-y-3">
                {referrals.map((ref: any) => (
                  <div key={ref.id} className="glass-card p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-display font-semibold text-foreground">
                            {ref.profile?.full_name || "Unknown"}
                          </p>
                          <Badge variant="outline" className="text-[10px] font-mono">
                            {ref.code}
                          </Badge>
                          {ref.rewardEligible && (
                            <Badge className="text-[10px] bg-primary">
                              <Gift className="w-3 h-3 mr-1" /> ₹200 Eligible
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {ref.profile?.email} · Signups: {ref.totalReferrals} · Purchased: {ref.purchasedReferrals}/5
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-bold text-foreground">{ref.purchasedReferrals}/5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
};

export default AdminDashboard;
