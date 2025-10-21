import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LifeBuoy,
  Users,
  Boxes,
  ShoppingCart,
  HardDrive,
  Printer,
  Network as NetworkIcon,
  Mail,
  UserPlus,
  KanbanSquare,
  Monitor,
  Smartphone,
  FileText,
  BookOpen,
  Settings as SettingsIcon,
  Home,
  Ticket,
  ShieldCheck,
  AlertTriangle,
  Server,
  ArrowLeft,
  Globe,
  Moon,
  Sun,
  X,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ------- Brand -------
const brand = {
  blueStart: "#0B2F63",
  blueEnd: "#0B4EA2",
};

// ------- i18n -------
const i18n = {
  en: {
    welcome: "Welcome to the IT Service Portal",
    subWelcome: "Find services, request support, or browse knowledge",
    searchPh: "Search the catalog, articles, or tickets...",
    quick: {
      myTickets: "My Tickets",
      catalog: "Service Catalog",
      kb: "Knowledge Base",
      forms: "Forms",
      contacts: "Contacts",
      status: "Service Status",
    },
    browseBy: "Browse by Category",
    browseHelp: "Search the catalog or pick a category below.",
    back: "Back to categories",
    needHelp: "Need help fast?",
    urgent: "Urgent Request",
    noActions: "No predefined actions",
    tellUs: "Tell us what you need and we'll help.",
    openGeneral: "Open a General Request",
    footer: {
      help: "Help & Support",
      resources: "Resources",
      status: "Status",
      openTicket: "Open a Ticket",
      contact: "Contact IT",
      sysStatus: "System Status",
      planned: "Planned Maintenance",
      sla: "SLA & Policies",
    },
    categories: {
      "Request Support": { d: "Open or track a ticket" },
      "User Management": { d: "Create, modify, disable users" },
      "COTS Software": { d: "Request standard applications" },
      Purchase: { d: "Order licenses and devices" },
      "File System": { d: "Shares, permissions, storage" },
      Printer: { d: "New device or troubleshooting" },
      Network: { d: "Access, VPN, Wi-Fi, firewall" },
      "Exchange Online": { d: "Mailboxes, groups, aliases" },
      "Group Management": { d: "Create or modify groups" },
      KanBo: { d: "Boards, spaces, access" },
      Hardware: { d: "Laptops, monitors, peripherals" },
      "Mobile Device": { d: "New phone or enrollment" },
    },
    chips: { request: "Request", howto: "How-to", troubleshoot: "Troubleshoot" },
    form: {
      title: "Submit Request",
      name: "Your name",
      email: "Email",
      summary: "Short summary",
      details: "Details",
      priority: "Priority",
      low: "Low",
      normal: "Normal",
      high: "High",
      submit: "Send",
      cancel: "Cancel",
      thanks: "Thanks for your request! We'll take it from here.",
      redirect: "Redirecting to dashboard...",
    },
  },
  de: {
    welcome: "Willkommen im IT-Service-Portal",
    subWelcome: "Services finden, Support anfragen oder Wissen durchsuchen",
    searchPh: "Katalog, Artikel oder Tickets durchsuchen...",
    quick: {
      myTickets: "Meine Tickets",
      catalog: "Servicekatalog",
      kb: "Wissensdatenbank",
      forms: "Formulare",
      contacts: "Kontakte",
      status: "Service-Status",
    },
    browseBy: "Nach Kategorie stöbern",
    browseHelp: "Durchsuche den Katalog oder wähle eine Kategorie.",
    back: "Zurück zu den Kategorien",
    needHelp: "Brauchen Sie schnell Hilfe?",
    urgent: "Dringende Anfrage",
    noActions: "Keine vordefinierten Aktionen",
    tellUs: "Beschreiben Sie Ihr Anliegen – wir helfen.",
    openGeneral: "Allgemeine Anfrage öffnen",
    footer: {
      help: "Hilfe & Support",
      resources: "Ressourcen",
      status: "Status",
      openTicket: "Ticket eröffnen",
      contact: "IT kontaktieren",
      sysStatus: "Systemstatus",
      planned: "Geplante Wartung",
      sla: "SLA & Richtlinien",
    },
    categories: {
      "Request Support": { d: "Ticket eröffnen oder verfolgen" },
      "User Management": { d: "Benutzer anlegen, ändern, sperren" },
      "COTS Software": { d: "Standardsoftware anfordern" },
      Purchase: { d: "Lizenzen und Geräte bestellen" },
      "File System": { d: "Freigaben, Berechtigungen, Speicher" },
      Printer: { d: "Neues Gerät oder Störung" },
      Network: { d: "Zugang, VPN, WLAN, Firewall" },
      "Exchange Online": { d: "Postfächer, Gruppen, Aliasse" },
      "Group Management": { d: "Gruppen erstellen oder ändern" },
      KanBo: { d: "Boards, Spaces, Zugriffe" },
      Hardware: { d: "Laptops, Monitore, Peripherie" },
      "Mobile Device": { d: "Neues Smartphone oder Enrollment" },
    },
    chips: { request: "Anfrage", howto: "How-to", troubleshoot: "Fehlerbehebung" },
    form: {
      title: "Anfrage senden",
      name: "Ihr Name",
      email: "E-Mail",
      summary: "Kurze Zusammenfassung",
      details: "Details",
      priority: "Priorität",
      low: "Niedrig",
      normal: "Normal",
      high: "Hoch",
      submit: "Senden",
      cancel: "Abbrechen",
      thanks: "Danke für Ihre Anfrage! Wir kümmern uns darum.",
      redirect: "Weiterleitung zum Dashboard...",
    },
  },
};

const LANGS = Object.keys(i18n);

// ------- Catalog & Actions -------
const CATS = [
  { title: "Request Support", icon: LifeBuoy, accent: "from-blue-500/25 to-blue-500/0" },
  { title: "User Management", icon: Users, accent: "from-sky-500/25 to-sky-500/0" },
  { title: "COTS Software", icon: Boxes, accent: "from-indigo-500/25 to-indigo-500/0" },
  { title: "Purchase", icon: ShoppingCart, accent: "from-teal-500/25 to-teal-500/0" },
  { title: "File System", icon: HardDrive, accent: "from-blue-400/25 to-blue-400/0" },
  { title: "Printer", icon: Printer, accent: "from-cyan-500/25 to-cyan-500/0" },
  { title: "Network", icon: NetworkIcon, accent: "from-emerald-500/25 to-emerald-500/0" },
  { title: "Exchange Online", icon: Mail, accent: "from-fuchsia-500/25 to-fuchsia-500/0" },
  { title: "Group Management", icon: UserPlus, accent: "from-purple-500/25 to-purple-500/0" },
  { title: "KanBo", icon: KanbanSquare, accent: "from-pink-500/25 to-pink-500/0" },
  { title: "Hardware", icon: Monitor, accent: "from-violet-500/25 to-violet-500/0" },
  { title: "Mobile Device", icon: Smartphone, accent: "from-indigo-400/25 to-indigo-400/0" },
];

const ACTIONS = {
  "File System": [
    { label: "Shares", description: "Request a new share or change access" },
    { label: "Permissions", description: "Grant/Remove user or group rights" },
    { label: "Storage", description: "Request storage increase / quota" },
    { label: "Restore", description: "Recover deleted files/folders" },
  ],
  Network: [
    { label: "VPN Access" },
    { label: "Wi-Fi Issue" },
    { label: "Firewall Rule" },
    { label: "New Network Port" },
  ],
  Printer: [
    { label: "Install Printer" },
    { label: "Toner/Ink" },
    { label: "Paper Jam" },
  ],
  "User Management": [
    { label: "New User" },
    { label: "Disable User" },
    { label: "Reset Password" },
    { label: "Add to Group" },
  ],
};

// ------- Dynamic Form Schemas (per action) -------
const schemaKey = (category, action) => `${category} - ${action}`;

const FORM_SCHEMAS = {
  // User Management
  [schemaKey("User Management", "New User")]: [
    { name: "firstName", label: "First name", type: "text", required: true },
    { name: "lastName", label: "Last name", type: "text", required: true },
    { name: "email", label: "Work email", type: "email", required: true },
    { name: "department", label: "Department", type: "text" },
    { name: "manager", label: "Manager", type: "text" },
    { name: "startDate", label: "Start date", type: "date", required: true },
    { name: "role", label: "Role", type: "text" },
    { name: "licenseE3", label: "Assign M365 E3", type: "toggle" },
  ],
  [schemaKey("User Management", "Disable User")]: [
    { name: "user", label: "Username / Email", type: "text", required: true },
    { name: "lastDay", label: "Last day", type: "date", required: true },
    { name: "transferTo", label: "Transfer ownership to", type: "text" },
    { name: "reason", label: "Reason", type: "textarea" },
  ],
  [schemaKey("User Management", "Reset Password")]: [
    { name: "user", label: "Username / Email", type: "text", required: true },
    { name: "mfaReset", label: "Reset MFA", type: "toggle" },
    { name: "urgency", label: "Urgency", type: "select", options: ["Low", "Normal", "High"], required: true },
  ],
  [schemaKey("User Management", "Add to Group")]: [
    { name: "user", label: "User", type: "text", required: true },
    { name: "group", label: "Group name", type: "text", required: true },
    { name: "access", label: "Access level", type: "select", options: ["Read", "Contribute", "Owner"], required: true },
    { name: "duration", label: "Temporary until", type: "date" },
  ],
  // File System
  [schemaKey("File System", "Shares")]: [
    { name: "shareName", label: "Share name", type: "text", required: true },
    { name: "path", label: "Path (\\\\server\\share)", type: "text" },
    { name: "owner", label: "Owner", type: "text" },
    { name: "size", label: "Requested size (GB)", type: "number" },
    { name: "justification", label: "Justification", type: "textarea" },
  ],
  [schemaKey("File System", "Permissions")]: [
    { name: "target", label: "User/Group", type: "text", required: true },
    { name: "share", label: "Share/Folder", type: "text", required: true },
    { name: "perm", label: "Permission", type: "select", options: ["Read", "Change", "Full Control"], required: true },
    { name: "justification", label: "Justification", type: "textarea" },
  ],
  [schemaKey("File System", "Storage")]: [
    { name: "share", label: "Share/Volume", type: "text", required: true },
    { name: "increase", label: "Increase by (GB)", type: "number", required: true },
    { name: "justification", label: "Justification", type: "textarea" },
  ],
  [schemaKey("File System", "Restore")]: [
    { name: "path", label: "Path to file/folder", type: "text", required: true },
    { name: "when", label: "Restore point (date & time)", type: "datetime", required: true },
    { name: "notes", label: "Notes", type: "textarea" },
  ],
  // Network
  [schemaKey("Network", "VPN Access")]: [
    { name: "user", label: "User", type: "text", required: true },
    { name: "start", label: "Start date", type: "date" },
    { name: "end", label: "End date", type: "date" },
    { name: "reason", label: "Reason", type: "textarea" },
  ],
  [schemaKey("Network", "Wi-Fi Issue")]: [
    { name: "location", label: "Location", type: "text" },
    { name: "device", label: "Device", type: "text" },
    { name: "details", label: "Issue details", type: "textarea", required: true },
  ],
  [schemaKey("Network", "Firewall Rule")]: [
    { name: "source", label: "Source", type: "text", required: true },
    { name: "destination", label: "Destination", type: "text", required: true },
    { name: "port", label: "Port", type: "text", required: true },
    { name: "protocol", label: "Protocol", type: "select", options: ["TCP", "UDP", "ICMP"] },
    { name: "reason", label: "Reason", type: "textarea" },
  ],
  [schemaKey("Network", "New Network Port")]: [
    { name: "building", label: "Building", type: "text", required: true },
    { name: "room", label: "Room", type: "text", required: true },
    { name: "vlan", label: "VLAN", type: "text" },
  ],
  // Printer
  [schemaKey("Printer", "Install Printer")]: [
    { name: "model", label: "Printer model", type: "text", required: true },
    { name: "location", label: "Location", type: "text", required: true },
    { name: "computer", label: "Computer name", type: "text" },
  ],
  [schemaKey("Printer", "Toner/Ink")]: [
    { name: "printerId", label: "Printer ID", type: "text", required: true },
    { name: "color", label: "Color", type: "select", options: ["Black", "Cyan", "Magenta", "Yellow"], required: true },
  ],
  [schemaKey("Printer", "Paper Jam")]: [
    { name: "printerId", label: "Printer ID", type: "text", required: true },
    { name: "details", label: "Details", type: "textarea" },
  ],
};

// ------- util + nav -------
const cx = (...classes) => classes.filter(Boolean).join(" ");

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "tickets", label: "Tickets", icon: Ticket },
  { key: "knowledge", label: "Knowledge", icon: BookOpen },
  { key: "services", label: "Services", icon: Boxes },
  { key: "systems", label: "Systems", icon: Server },
  { key: "users", label: "Users", icon: Users },
  { key: "security", label: "Security", icon: ShieldCheck },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

function SidebarItem({ label, icon: Icon, active = false, onClick }) {
  return (
    <button onClick={onClick} className={cx(
      "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white",
      active ? "bg-white/10 text-white" : "text-white/80"
    )}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function CategoryCard({ title, description, icon: Icon, accent, onClick, labels, dark }) {
  return (
    <motion.button onClick={onClick} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="text-left">
      <Card className={cx(
        "relative overflow-hidden rounded-2xl border shadow-sm transition",
        dark ? "bg-[#121826] border-[#1f2a44] hover:shadow-lg" : "bg-white border-slate-200/60 hover:shadow-md"
      )}>
        <div className={cx("pointer-events-none absolute inset-0 bg-gradient-to-b", accent, dark && "opacity-5")} />
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className={cx("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-[#0f172a]" : "bg-slate-100")}> 
              <Icon className={cx("h-5 w-5", dark && "text-slate-200")} />
            </div>
            <div>
              <CardTitle className={cx("text-base", dark && "text-slate-100")}>{title}</CardTitle>
              <CardDescription className={cx("text-xs", dark ? "text-slate-300" : "text-slate-500")}>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className={cx("rounded-full", dark && "bg-slate-700 text-slate-100")}>{labels?.request ?? 'Request'}</Badge>
            <Badge variant="outline" className={cx("rounded-full", dark && "border-slate-600 text-slate-200")}>{labels?.howto ?? 'How-to'}</Badge>
            <Badge variant="outline" className={cx("rounded-full", dark && "border-slate-600 text-slate-200")}>{labels?.troubleshoot ?? 'Troubleshoot'}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}

function ActionCard({ label, description, dark, onOpen }) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Card className={cx("rounded-2xl border shadow-sm", dark ? "bg-[#121826] border-[#1f2a44] hover:shadow-lg" : "bg-white border-slate-200/60 hover:shadow-md")}> 
        <CardHeader className="pb-2">
          <CardTitle className={cx("text-sm", dark && "text-slate-100")}>{label}</CardTitle>
          {description && <CardDescription className={cx("text-xs", dark ? "text-slate-300" : "text-slate-500")}>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="pt-0">
          <Button size="sm" variant="secondary" className={cx("rounded-full", dark && "bg-white text-slate-900 hover:bg-white/90")} onClick={onOpen}>Open</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ------- Simple Modal with Form -------
function FormModal({ open, onClose, onSubmit, title, lang, dark, fields }) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState({});

  const defaultFields = useMemo(() => ([
    { name: "name", label: i18n[lang].form.name, type: "text", required: true },
    { name: "email", label: i18n[lang].form.email, type: "email", required: true },
    { name: "summary", label: i18n[lang].form.summary, type: "text", required: true },
    { name: "details", label: i18n[lang].form.details, type: "textarea", required: true },
    { name: "priority", label: i18n[lang].form.priority, type: "select", options: [i18n[lang].form.low, i18n[lang].form.normal, i18n[lang].form.high], required: true, defaultValue: i18n[lang].form.normal },
  ]), [lang]);

  const usedFields = useMemo(
    () => (Array.isArray(fields) && fields.length ? fields : defaultFields),
    [fields, defaultFields],
  );

  useEffect(() => {
    if (!open) {
      setSending(false);
      setDone(false);
      setValues({});
      return;
    }

    const initialValues = usedFields.reduce((acc, field) => {
      if (!field?.name) return acc;
      const fallback = field.type === "select"
        ? field.options?.[0] ?? ""
        : field.type === "toggle"
          ? false
          : "";
      acc[field.name] = field.defaultValue ?? fallback;
      return acc;
    }, {});

    setValues(initialValues);
  }, [open, usedFields]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setDone(true);
      onSubmit(values);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className={cx("w-full max-w-xl rounded-2xl shadow-xl", dark ? "bg-[#121826] border border-[#1f2a44] text-slate-100" : "bg-white")}> 
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-slate-200/40"><X className="h-5 w-5"/></button>
        </div>
        <div className="px-5 pb-5">
          {!done ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {usedFields.map((f) => (
                <div key={f.name} className="block text-sm">
                  <label className="mb-1 block">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      required={!!f.required}
                      rows={5}
                      value={values[f.name] ?? f.defaultValue ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                      className={cx("w-full rounded-md border px-3 py-2", dark ? "bg-[#0f172a] border-[#1f2a44] text-slate-100" : "bg-white border-slate-300")}
                    />
                  ) : f.type === "select" ? (
                    <select
                      required={!!f.required}
                      value={values[f.name] ?? f.defaultValue ?? (f.options?.[0] ?? "")}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                      className={cx("w-full rounded-md border px-3 py-2", dark ? "bg-[#0f172a] border-[#1f2a44] text-slate-100" : "bg-white border-slate-300")}
                    >
                      {(f.options || []).map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "toggle" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={values[f.name] ?? f.defaultValue ?? false}
                        onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.checked }))}
                      />
                      <span className="text-sm opacity-80">{(values[f.name] ?? f.defaultValue ?? false) ? "Yes" : "No"}</span>
                    </div>
                  ) : (
                    <Input
                      type={f.type === "datetime" ? "datetime-local" : f.type}
                      required={!!f.required}
                      value={values[f.name] ?? f.defaultValue ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                      className={cx(dark && "bg-[#0f172a] border-[#1f2a44] text-slate-100")}
                    />
                  )}
                </div>
              ))}
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose} className={cx(dark && "border-[#1f2a44] text-slate-100")}>{i18n[lang].form.cancel}</Button>
                <Button type="submit" disabled={sending}>{sending ? "..." : i18n[lang].form.submit}</Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <CheckCircle2 className="h-10 w-10" />
              <div className="text-base font-medium">{i18n[lang].form.thanks}</div>
              <div className="text-sm opacity-80">{i18n[lang].form.redirect}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HelpdeskPortal() {
  const readStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("Unable to read from localStorage", error);
      return null;
    }
  };

  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Unable to write to localStorage", error);
    }
  };

  const getStoredLang = () => {
    const stored = readStorage("portal-lang");
    return stored && LANGS.includes(stored) ? stored : "en";
  };

  const getStoredTab = () => {
    const stored = readStorage("portal-tab");
    const keys = NAV_ITEMS.map((item) => item.key);
    return stored && keys.includes(stored) ? stored : "home";
  };

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState(getStoredLang);
  const [isDark, setIsDark] = useState(() => readStorage("portal-theme") === "dark");
  const [tab, setTab] = useState(getStoredTab);

  useEffect(() => { writeStorage("portal-theme", isDark ? "dark" : "light"); }, [isDark]);
  useEffect(() => { writeStorage("portal-lang", lang); }, [lang]);
  useEffect(() => { writeStorage("portal-tab", tab); }, [tab]);

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formFields, setFormFields] = useState(undefined);
  const openForm = (title, fields) => {
    setFormTitle(title);
    setFormFields(fields);
    setFormOpen(true);
  };
  const afterSubmit = () => {
    setTimeout(() => {
      setFormOpen(false);
      setSelected(null);
      setTab("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const t = (key) => i18n[lang][key];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cats = CATS.map((c) => ({
      ...c,
      description: (i18n[lang].categories?.[c.title]?.d ?? ""),
    }));
    if (!q) return cats;
    return cats.filter((c) => [c.title, c.description].join(" ").toLowerCase().includes(q));
  }, [query, lang]);

  const selectedCat = CATS.find((c) => c.title === selected);
  const selectedActions = selected ? ACTIONS[selected] ?? [] : [];

  // resizable sidebar
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const stored = readStorage("portal-sidebar-width");
    const v = Number(stored);
    return Number.isFinite(v) && v >= 220 && v <= 500 ? v : 300;
  });
  const [isResizing, setIsResizing] = useState(false);
  useEffect(() => {
    const onMove = (e) => { if (!isResizing) return; const x = Math.max(220, Math.min(500, e.clientX)); setSidebarWidth(x); };
    const onUp = () => {
      if (isResizing) {
        setIsResizing(false);
        writeStorage("portal-sidebar-width", String(sidebarWidth));
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, [isResizing, sidebarWidth]);

  // quick runtime checks ("tests")
  if (import.meta.env.DEV) {
    console.assert(Array.isArray(CATS) && CATS.length > 0, "CATS should be a non-empty array");
    console.assert(!!i18n.en && !!i18n.de, "i18n should have en and de");
    // verify schemas exist for declared actions
    Object.entries(ACTIONS).forEach(([cat, acts]) => {
      acts.forEach((a) => {
        const key = schemaKey(cat, a.label);
        console.assert(!!FORM_SCHEMAS[key] || ["Tickets"].includes(cat), `Missing schema for ${key}`);
      });
    });
  }

  return (
    <div className={cx("min-h-screen w-full flex flex-col", isDark ? "bg-[#0b1220] text-slate-100" : "bg-slate-100 text-slate-900")}> 
      {/* Shell */}
      <div className={cx("w-full flex flex-1", isDark ? "bg-[#0d1526]" : "bg-slate-50")}> 
        <div className="min-h-full w-full md:flex">
          {/* Sidebar */}
          <aside className="relative hidden md:flex md:min-h-full flex-col gap-2" style={{ background: `linear-gradient(180deg, ${brand.blueStart} 0%, ${brand.blueEnd} 100%)`, width: sidebarWidth }}>
            <div className="flex items-center gap-3 px-4 pt-5 text-white">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <LifeBuoy className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide">IT Helpdesk</div>
                <div className="text-xs opacity-80">Service Portal</div>
              </div>
            </div>
            <Separator className="my-4 bg-white/20" />
            <nav className="flex flex-1 flex-col gap-1 px-2">
              {NAV_ITEMS.map((item) => (
                <SidebarItem
                  key={item.key}
                  label={item.label}
                  icon={item.icon}
                  active={tab === item.key}
                  onClick={() => { setTab(item.key); setSelected(null); }}
                />
              ))}
            </nav>
            {/* resize handle */}
            <div onMouseDown={() => setIsResizing(true)} title="Drag to resize" className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize bg-white/10 hover:bg-white/20" />
            <div className="mt-auto p-4">
              <Card className="border-white/20 bg-white/10 text-white backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t("needHelp")}</CardTitle>
                  <CardDescription className="text-white/80">Open a high-priority ticket and we'll get right on it.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full" onClick={() => openForm(i18n[lang].urgent)}>
                    <AlertTriangle className="mr-2 h-4 w-4" /> {t("urgent")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main */}
          <main className="flex min-h-full flex-col flex-1">
            {/* Topbar */}
            <div className="relative w-full border-b" style={{ background: `linear-gradient(90deg, ${brand.blueStart} 0%, ${brand.blueEnd} 100%)` }}>
              <div className="flex w-full items-center justify-between gap-2 px-4 py-5 text-white">
                <div className="hidden text-left md:block">
                  <div className="text-sm font-semibold tracking-wide">{t("welcome")}</div>
                  <div className="text-xs opacity-80">{t("subWelcome")}</div>
                </div>
                <div className="flex w-full max-w-3xl items-center gap-2 md:ml-auto">
                  <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" />
                    <Input className="w-full rounded-xl border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/70 focus-visible:ring-white" placeholder={t("searchPh")} value={query} onChange={(e) => setQuery(e.target.value)} />
                  </div>
                  <Button variant="secondary" className="rounded-xl bg-white text-slate-900 hover:bg-white/90">{lang === 'de' ? 'Suchen' : 'Search'}</Button>
                  <Button variant="secondary" className="rounded-xl bg-white text-slate-900 hover:bg-white/90" onClick={() => setLang(lang === 'en' ? 'de' : 'en')} title={lang === 'en' ? 'Switch to German' : 'Wechsel zu Englisch'}>
                    <Globe className="mr-2 h-4 w-4" /> {lang.toUpperCase()}
                  </Button>
                  <Button variant="secondary" className="rounded-xl bg-white text-slate-900 hover:bg-white/90" onClick={() => setIsDark(v => !v)} title="Toggle theme">
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full flex-1 px-4 py-6">
              {tab === 'home' && !selected && (
                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: i18n[lang].quick.myTickets, icon: Ticket, onClick: () => setTab('tickets') },
                    { title: i18n[lang].quick.catalog, icon: Boxes, onClick: () => {} },
                    { title: i18n[lang].quick.kb, icon: BookOpen, onClick: () => setTab('knowledge') },
                    { title: i18n[lang].quick.forms, icon: FileText, onClick: () => openForm(i18n[lang].quick.forms) },
                    { title: i18n[lang].quick.contacts, icon: Users, onClick: () => setTab('users') },
                    { title: i18n[lang].quick.status, icon: AlertTriangle, onClick: () => setTab('systems') },
                  ].map((s) => (
                    <Button key={s.title} variant="outline" className={cx("h-auto justify-start gap-3 rounded-2xl border py-3 text-left shadow-sm hover:bg-slate-50", isDark ? "bg-[#121826] border-[#1f2a44] text-slate-100 hover:bg-[#162036]" : "bg-white border-slate-200 text-slate-900")} onClick={s.onClick}> 
                      <s.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{s.title}</span>
                    </Button>
                  ))}
                </div>
              )}

              <div className="mb-3 flex items-end justify-between">
                {tab === 'home' && !selected && (
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">{t("browseBy")}</h2>
                    <p className="text-sm opacity-80">{t("browseHelp")}</p>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {tab === 'home' && !selected && (
                  <motion.div key="grid" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((c) => (
                      <CategoryCard
                        key={c.title}
                        title={c.title}
                        description={i18n[lang].categories?.[c.title]?.d}
                        icon={c.icon}
                        accent={c.accent}
                        onClick={() => setSelected(c.title)}
                        labels={i18n[lang].chips}
                        dark={isDark}
                      />
                    ))}
                  </motion.div>
                )}

                {tab === 'home' && selected && selectedCat && (
                  <motion.div key="detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => setSelected(null)} className={cx("rounded-xl", isDark && "border-[#1f2a44]")}> 
                        <ArrowLeft className="mr-2 h-4 w-4" /> {t("back")}
                      </Button>
                    </div>

                    <CategoryCard
                      title={selectedCat.title}
                      description={i18n[lang].categories?.[selectedCat.title]?.d}
                      icon={selectedCat.icon}
                      accent={selectedCat.accent}
                      onClick={() => {}}
                      labels={i18n[lang].chips}
                      dark={isDark}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {selectedActions.length > 0 ? (
                        selectedActions.map((a) => (
                          <ActionCard key={a.label} {...a} dark={isDark} onOpen={() => openForm(schemaKey(selectedCat.title, a.label), FORM_SCHEMAS[schemaKey(selectedCat.title, a.label)])} />
                        ))}
                      ) : (
                        <Card className={cx("border-dashed", isDark ? "bg-[#121826] border-[#1f2a44]" : "")}> 
                          <CardHeader>
                            <CardTitle className="text-base">{t("noActions")}</CardTitle>
                            <CardDescription>{t("tellUs")}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button onClick={() => openForm(i18n[lang].openGeneral)}>{t("openGeneral")}</Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </motion.div>
                )}

                {tab === 'tickets' && (
                  <motion.div key="tickets" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Tickets</h2>
                      <Button onClick={() => openForm('Open Ticket')}>+ {lang==='de'?'Ticket eröffnen':'Open Ticket'}</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {['INC-1021','SR-559','INC-1017','SR-553'].map((id,i)=> (
                        <Card key={id} className={cx('rounded-2xl border', isDark ? 'bg-[#121826] border-[#1f2a44]' : 'bg-white border-slate-200')}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{id} - {(i%2?'In Progress':'New')}</CardTitle>
                            <CardDescription>{['VPN not connecting','New monitor request','Printer offline','Add user to group'][i]}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button size="sm" variant="outline" onClick={() => openForm(`Update ${id}`)}>Update</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {tab === 'users' && (
                  <motion.div key="users" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Users</h2>
                      <Button onClick={() => openForm(schemaKey('User Management','New User'), FORM_SCHEMAS[schemaKey('User Management','New User')])}>{lang==='de'? 'Neuen Benutzer anlegen':'Create User'}</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {['alex.meyer','li.na','sam.otto','maria.fernandez'].map((u)=> (
                        <Card key={u} className={cx('rounded-2xl border', isDark ? 'bg-[#121826] border-[#1f2a44]' : 'bg-white border-slate-200')}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{u}</CardTitle>
                            <CardDescription>Employee</CardDescription>
                          </CardHeader>
                          <CardContent className="flex gap-2 pt-0">
                            <Button size="sm" variant="outline" onClick={() => openForm(schemaKey('User Management','Reset Password'), FORM_SCHEMAS[schemaKey('User Management','Reset Password')])}>{lang==='de'?'Passwort zurücksetzen':'Reset Password'}</Button>
                            <Button size="sm" variant="outline" onClick={() => openForm(schemaKey('User Management','Add to Group'), FORM_SCHEMAS[schemaKey('User Management','Add to Group')])}>{lang==='de'?'Zu Gruppe hinzufügen':'Add to Group'}</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {tab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                    <h2 className="text-xl font-semibold">Settings</h2>
                    <Card className={cx('rounded-2xl border', isDark ? 'bg-[#121826] border-[#1f2a44]' : 'bg-white border-slate-200')}>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">Preferences</CardTitle></CardHeader>
                      <CardContent className="flex flex-wrap items-center gap-2 pt-0">
                        <Button variant="outline" onClick={() => setLang(lang==='en'?'de':'en')}>{lang==='en'?'Switch to German':'Wechsel zu Englisch'}</Button>
                        <Button variant="outline" onClick={() => setIsDark(v=>!v)}>{isDark?'Light Mode':'Dark Mode'}</Button>
                        <Button variant="outline" onClick={() => { localStorage.removeItem('portal-sidebar-width'); window.location.reload(); }}>Reset Sidebar Width</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto w-full" style={{ background: `linear-gradient(90deg, ${brand.blueStart} 0%, ${brand.blueEnd} 100%)` }}>
        <div className="mx-auto max-w-[1400px] px-6 py-8 text-white">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">{i18n[lang].footer.help}</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>{i18n[lang].footer.openTicket}</li>
                <li>{t("urgent")}</li>
                <li>{i18n[lang].footer.contact}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">{i18n[lang].footer.resources}</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>{i18n[lang].quick.kb}</li>
                <li>{i18n[lang].quick.catalog}</li>
                <li>{i18n[lang].quick.forms}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">{i18n[lang].footer.status}</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>{i18n[lang].footer.sysStatus}</li>
                <li>{i18n[lang].footer.planned}</li>
                <li>{i18n[lang].footer.sla}</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-white/20 pt-4 text-xs text-white/80">© {new Date().getFullYear()} IT Service Portal · All rights reserved</div>
        </div>
      </footer>

      {/* Form Modal */}
      <FormModal open={formOpen} onClose={() => setFormOpen(false)} onSubmit={afterSubmit} title={`${i18n[lang].form.title}: ${formTitle}`} lang={lang} dark={isDark} fields={formFields} />
    </div>
  );
}
