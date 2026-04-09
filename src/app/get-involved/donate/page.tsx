"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { submitDonation } from "@/lib/submissions";
import { SITE_CONFIG } from "@/lib/constants";
import { Heart, BookOpen, Shirt, Shield, CreditCard, Building2, CheckCircle, AlertCircle, Loader2, User, Mail, MessageSquare, Copy, Check, Phone } from "lucide-react";

const usdAmounts = [
  { value: 25, impact: "Provides learning materials for 5 students", icon: BookOpen },
  { value: 50, impact: "Supplies reusable pad kits for 10 girls", icon: Heart },
  { value: 100, impact: "Sponsors a child's school term", icon: Shirt },
];

const ngnAmounts = [
  { value: 5000, impact: "Provides school supplies for a student", icon: BookOpen },
  { value: 10000, impact: "Supplies reusable pad kits for girls", icon: Heart },
  { value: 50000, impact: "Sponsors a child's school term", icon: Shirt },
];

const ngnBankDetails = {
  accountName: "Haleyouth Foundation",
  bank: "Guaranty Trust Bank",
  accountNumber: "0617009307",
  currency: "NGN",
};

const domAccounts = [
  { accountNumber: "0617009307", currency: "NGN", bank: "Guaranty Trust Bank" },
  { accountNumber: "3002372479", currency: "GBP", bank: "Guaranty Trust Bank" },
  { accountNumber: "3002372486", currency: "EUR", bank: "Guaranty Trust Bank" },
  { accountNumber: "3002372493", currency: "USD", bank: "Guaranty Trust Bank" },
];

const programs = [
  "General Fund", "Pad-a-Girl", "Back to School", "Scholars of Change",
  "STEM Camp", "Digital Skills", "Humanitarian Projects", "Community Healthcare",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary transition-all"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-secondary" /> : <Copy size={14} />}
    </button>
  );
}

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("General Fund");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("online");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amounts = currency === "usd" ? usdAmounts : ngnAmounts;
  const effectiveAmount = selected ?? (custom ? Number(custom) : 0);
  const symbol = currency === "usd" ? "$" : "₦";

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || !name || !email || !phone) return;
    setLoading(true);
    setError("");
    try {
      await submitDonation({ name, email, phone, amount: effectiveAmount, currency, program, message, method, anonymous });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <PageHeader title="Thank You!" subtitle="Your generosity makes a real difference." badge="Donation" />
        <section className="py-24 bg-bg-primary">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto px-4">
            <div className="card-premium p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3" style={{ fontFamily: "var(--font-playfair)" }}>Donation Pledge Received!</h2>
              <p className="text-text-secondary mb-2">
                Thank you, <strong>{name}</strong>. Your pledge of <strong>{symbol}{effectiveAmount.toLocaleString()}</strong> for <strong>{program}</strong> has been recorded.
              </p>
              <p className="text-text-secondary text-sm mb-6">
                Our team will reach out to you at <strong>{email}</strong> with confirmation.
              </p>
              <div className="bg-primary/5 rounded-xl p-4 text-left text-sm">
                <p className="font-semibold text-text-primary mb-2">What happens next?</p>
                <ul className="text-text-secondary space-y-1 text-xs">
                  <li>1. You&apos;ll receive a confirmation email shortly</li>
                  <li>2. If paying via bank transfer, use the account details provided</li>
                  <li>3. Once payment is confirmed, you&apos;ll receive a receipt</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Donate" subtitle="Every contribution builds a brighter tomorrow for young people across Nigeria." badge="Support Our Mission" />

      <section className="py-16 sm:py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="card-premium p-6 sm:p-8 lg:p-12">
            {/* Currency selector */}
            <div className="flex gap-2 mb-8">
              <button type="button" onClick={() => { setCurrency("usd"); setSelected(50); setCustom(""); }} className={`flex-1 py-3.5 rounded-xl font-medium text-sm transition-all ${currency === "usd" ? "btn-primary !shadow-md" : "bg-bg-secondary text-text-secondary hover:bg-primary/5 border border-gray-200"}`}>
                <CreditCard size={16} className="inline mr-2" /> International (USD)
              </button>
              <button type="button" onClick={() => { setCurrency("ngn"); setSelected(10000); setCustom(""); }} className={`flex-1 py-3.5 rounded-xl font-medium text-sm transition-all ${currency === "ngn" ? "btn-primary !shadow-md" : "bg-bg-secondary text-text-secondary hover:bg-primary/5 border border-gray-200"}`}>
                <Building2 size={16} className="inline mr-2" /> Nigeria (NGN)
              </button>
            </div>

            {currency === "ngn" && (
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 mb-6 text-center">
                <p className="text-secondary font-medium text-sm">We accept and appreciate all donation efforts</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 border border-red-100">
                <AlertCircle size={16} className="shrink-0" /> {error}
              </div>
            )}

            {/* Bank Account Details */}
            {currency === "ngn" ? (
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-5 mb-8">
                <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Building2 size={16} className="text-primary" /> Bank Account Details (Naira)
                </h3>
                <div className="bg-white rounded-lg p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div><span className="text-xs text-gray-400">Account Name</span><p className="text-sm font-semibold text-text-primary">{ngnBankDetails.accountName}</p></div>
                    <CopyButton text={ngnBankDetails.accountName} />
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-center justify-between">
                    <div><span className="text-xs text-gray-400">Bank</span><p className="text-sm font-semibold text-text-primary">{ngnBankDetails.bank}</p></div>
                    <CopyButton text={ngnBankDetails.bank} />
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-center justify-between">
                    <div><span className="text-xs text-gray-400">Account Number</span><p className="text-sm font-bold text-primary tracking-wider">{ngnBankDetails.accountNumber}</p></div>
                    <CopyButton text={ngnBankDetails.accountNumber} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-5 mb-8">
                <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                  <CreditCard size={16} className="text-primary" /> Domiciliary Account Details (International)
                </h3>
                <p className="text-xs text-text-secondary mb-3">Guaranty Trust Bank — Haleyouth Foundation</p>
                <div className="space-y-2">
                  {domAccounts.map((acc) => (
                    <div key={acc.currency} className="bg-white rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-xs font-bold text-primary">{acc.currency}</span>
                        <div>
                          <p className="text-sm font-bold text-text-primary tracking-wider">{acc.accountNumber}</p>
                          <p className="text-[11px] text-gray-400">{acc.bank}</p>
                        </div>
                      </div>
                      <CopyButton text={acc.accountNumber} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amount selection */}
            <h3 className="font-bold text-text-primary mb-4">Select Amount ({symbol})</h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => { setSelected(a.value); setCustom(""); }}
                  className={`p-4 sm:p-5 rounded-xl text-center transition-all border-2 ${
                    selected === a.value ? "border-accent bg-accent/5 shadow-md shadow-accent/10" : "border-gray-200 hover:border-accent/40"
                  }`}
                >
                  <a.icon size={20} className="text-accent mx-auto mb-2" />
                  <p className="text-lg sm:text-xl font-bold text-text-primary">{symbol}{a.value.toLocaleString()}</p>
                  <p className="text-text-secondary text-[10px] sm:text-xs mt-1">{a.impact}</p>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-primary mb-2">Or enter a custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">{symbol}</span>
                <input type="number" min="1" value={custom} onChange={(e) => { setCustom(e.target.value); setSelected(null); }} placeholder="Enter amount" className={`${inputClass} !pl-10`} />
              </div>
            </div>

            {/* Donor info */}
            <div className="border-t border-gray-100 pt-8 mb-6">
              <h3 className="font-bold text-text-primary mb-4">Your Information</h3>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={`${inputClass} !pl-11`} placeholder="Your full name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} !pl-11`} placeholder="you@example.com" />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-text-primary mb-2">Phone Number with Country Code *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={`${inputClass} !pl-11`} placeholder="+234 801 234 5678" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Allocate to Program</label>
                  <select value={program} onChange={(e) => setProgram(e.target.value)} className={inputClass}>
                    {programs.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Payment Method</label>
                  <select value={method} onChange={(e) => setMethod(e.target.value)} className={inputClass}>
                    <option value="online">Online Payment</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Message (optional)</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-gray-400" />
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={`${inputClass} !pl-11 resize-none`} placeholder="Any message or notes for your donation..." />
                </div>
              </div>

              {/* Anonymous checkbox */}
              <label className="flex items-start gap-3 mt-5 cursor-pointer group">
                <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="mt-0.5 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer" />
                <div>
                  <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">Hide my donation information from public</p>
                  <p className="text-xs text-text-secondary mt-0.5">Your details will only be visible to the Haleyouth Foundation admin team.</p>
                </div>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!effectiveAmount || !name || !email || !phone || loading}
              className="w-full py-4 btn-accent flex items-center justify-center gap-2 !text-lg !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Heart size={20} className="fill-white" />}
              {loading ? "Processing..." : `Donate ${effectiveAmount ? `${symbol}${effectiveAmount.toLocaleString()}` : ""}`}
            </button>

            {/* Trust signals */}
            <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6 text-text-secondary text-xs flex-wrap">
              <span className="flex items-center gap-1"><Shield size={14} /> Secure</span>
              <span>{SITE_CONFIG.registration}</span>
              <span className="flex items-center gap-1"><Heart size={12} className="text-accent" /> Tax-deductible</span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
