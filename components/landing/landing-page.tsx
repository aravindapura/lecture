"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Bot,
  BrainCircuit,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Database,
  FileWarning,
  Gauge,
  LineChart,
  MessageSquareText,
  Radar,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navItems: Array<{ label: string; href: string }> = [
  { label: "Проблема", href: "#проблема" },
  { label: "Решение", href: "#решение" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Цена", href: "#pricing" },
];
const proofItems = ["Подходит для автопарков", "Логистических компаний", "Сервисных служб", "Корпоративного транспорта"];
const problems = [
  ["Данные в чатах и таблицах", "Статусы машин, пробеги и расходы теряются между Excel, WhatsApp и устными договоренностями."],
  ["Забытые ТО", "Регламентные работы всплывают слишком поздно — уже после простоя или аварийного ремонта."],
  ["Отсутствие контроля", "Руководитель видит фрагменты, но не единую картину по автопарку и ответственности."],
  ["Ошибки сотрудников", "Ручной ввод, человеческий фактор и невнимательность ломают управленческие решения."],
  ["Рост расходов", "Без аналитики невозможно быстро увидеть перерасход топлива, ремонта и простоев."],
  ["Простои автомобилей", "Каждый забытый документ или ремонт превращается в потерю денег и клиентов."],
];
const benefits: Array<[LucideIcon, string, string]> = [
  [ShieldCheck, "Полный контроль автопарка", "Все автомобили, документы, статусы и риски — в одном прозрачном контуре."],
  [BrainCircuit, "Снижение человеческого фактора", "AI понимает сообщения сотрудников и раскладывает данные без ручной рутины."],
  [BellRing, "AI-уведомления", "Система заранее подсвечивает ТО, страховки, техосмотр и критичные события."],
  [CircleDollarSign, "Прозрачность расходов", "Расходы по машинам и категориям собираются в понятную аналитику."],
  [Zap, "Минимум ручного ввода", "Команда пишет обычным языком, а система обновляет dashboard автоматически."],
  [Wrench, "Простота для механиков", "Не нужно учиться сложной CRM — достаточно отправить короткое сообщение в MAX."],
];
const steps: Array<[LucideIcon, string, string]> = [
  [MessageSquareText, "Сотрудник отправляет сообщение", "Например: пробег, ремонт, страховка, масло или статус машины."],
  [BrainCircuit, "AI распознает данные", "Модель выделяет автомобиль, событие, даты, суммы, пробег и приоритет."],
  [Database, "Система обновляет dashboard", "Данные попадают в Google Sheets и управленческую панель без ручных переносов."],
  [Radar, "Руководитель получает контроль", "Видны риски, расходы, дедлайны и реальные статусы всего автопарка."],
];
const notifications = [
  ["⚠️", "Скоро ТО", "Toyota Camry — через 1 250 км", "text-amber-200"],
  ["🚨", "Просрочено ТО", "Ford Transit — +8 дней", "text-red-200"],
  ["⚠️", "Заканчивается ОСАГО", "Kia Rio — 12 дней", "text-amber-200"],
  ["⚠️", "Заканчивается КАСКО", "BMW X5 — 21 день", "text-amber-200"],
  ["🚨", "Просрочен техосмотр", "Газель Next — нужен выезд", "text-red-200"],
];
const futureFeatures = ["Voice input", "Mobile app", "GPS tracking", "AI analytics", "Predictive repairs", "CRM integration", "Accounting integrations", "Photo recognition"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
        <Sparkles className="h-4 w-4" /> {eyebrow}
      </span>
      <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
    </Reveal>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-graphite/70 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Главная навигация">
        <a href="#top" className="flex items-center gap-3 font-semibold text-white" aria-label="AI Fleet Control home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-glow">
            <Bot className="h-5 w-5 text-cyan-200" />
          </span>
          <span>AI Fleet Control</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <Button asChild size="sm" variant="glass">
          <a href="#contact">Получить демо</a>
        </Button>
      </nav>
    </header>
  );
}

function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-graphite">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,18,0.3),#070A12_72%)]" />
      <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-[-10%] top-[15%] h-[34rem] w-[34rem] rounded-full bg-violet-500/16 blur-3xl" />
      <div className="absolute bottom-[8%] left-[-10%] h-[34rem] w-[34rem] rounded-full bg-cyan-400/14 blur-3xl" />
      <div className="absolute inset-0 bg-radial-grid bg-[length:28px_28px] opacity-[0.12]" />
    </div>
  );
}

function HeroDashboard() {
  const cars = [
    ["Toyota Camry", "ТО через 1 250 км", "86%", "bg-cyan-300"],
    ["Ford Transit", "В ремонте", "42%", "bg-amber-300"],
    ["Газель Next", "ОСАГО 12 дней", "64%", "bg-violet-300"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-violet-500/20 blur-3xl" />
      <Card className="relative overflow-hidden rounded-[2rem] p-4">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
          <div>
            <p className="text-sm text-slate-400">Fleet analytics</p>
            <h3 className="text-2xl font-semibold">124 автомобиля</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /> AI online
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-3">
            {cars.map(([name, status, value, color]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-cyan-200" />
                    <span className="font-medium">{name}</span>
                  </div>
                  <span className="text-sm text-slate-300">{status}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={cn("h-full rounded-full", color)} style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-cyan-100"><BellRing className="h-4 w-4" /> AI notifications</div>
              <p className="text-sm leading-6 text-slate-300">Обнаружено 7 задач на неделю: ТО, ОСАГО, 2 ремонта, 3 обновления пробега.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-300"><span>Expenses</span><span>$18.4k</span></div>
              <div className="flex h-28 items-end gap-2">
                {[34, 62, 48, 78, 52, 88, 69, 94].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-cyan-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-24 hidden rounded-2xl border border-violet-300/30 bg-violet-300/10 p-4 shadow-violet backdrop-blur-xl sm:block"
        >
          <p className="text-xs text-violet-100">AI processing flow</p>
          <p className="mt-1 text-sm text-white">Message → Parser → Dashboard</p>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <main id="top" className="relative overflow-hidden">
      <Background />
      <Header />

      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pt-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" /> AI automation for fleet operations
          </div>
          <h1 className="mt-8 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">AI Fleet Control</h1>
          <p className="mt-6 max-w-2xl text-2xl font-medium leading-tight text-slate-100 sm:text-3xl">
            Интеллектуальная система управления автопарком без хаоса, сложных таблиц и потери контроля.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            AI автоматически распознает сообщения сотрудников, обновляет данные автопарка, контролирует ТО, страховки и помогает руководителю видеть всю картину бизнеса в одном dashboard.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="neon"><a href="#contact">Получить демо <ArrowRight className="ml-2 h-5 w-5" /></a></Button>
            <Button asChild size="lg" variant="glass"><a href="#pricing">Обсудить внедрение</a></Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            {[["-31%", "ручной рутины"], ["24/7", "AI-контроль"], ["12 мин", "до запуска отчета"]].map(([metric, label]) => (
              <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-white">{metric}</div>
                <div className="mt-1 text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <HeroDashboard />
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 lg:justify-between">
          {proofItems.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">{item}</span>
          ))}
        </div>
      </section>

      <section id="проблема" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeader eyebrow="Operational chaos" title="Когда автопарк растет — управление превращается в хаос" description="Чем больше машин, сотрудников и документов, тем выше цена ошибки. AI Fleet Control превращает разрозненные сообщения в управляемую систему." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map(([title, text], i) => (
            <Reveal key={title}>
              <Card className="h-full border-red-300/10 bg-gradient-to-br from-red-500/[0.10] to-white/[0.04] p-1 transition duration-300 hover:-translate-y-1 hover:border-amber-300/30">
                <CardHeader>
                  <AlertTriangle className="mb-5 h-8 w-8 text-amber-200" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent><p className="leading-7 text-slate-300">{text}</p></CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="решение" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeader eyebrow="AI operating layer" title="AI берет рутину и контроль на себя" description="Сотрудники просто отправляют сообщение в мессенджер, AI понимает смысл и автоматически распределяет данные по системе." />
        <Reveal className="mt-14">
          <Card className="overflow-hidden p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="grid gap-4 sm:grid-cols-4 lg:grid-cols-1">
                {["MAX Bot", "AI Parser", "Google Sheets", "Dashboard + AI notifications"].map((item, i) => (
                  <div key={item} className="relative rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-100">{i + 1}</div>
                      <div className="font-semibold text-white">{item}</div>
                    </div>
                    {i < 3 && <div className="glass-line absolute -bottom-3 left-8 h-6 w-px sm:-right-3 sm:bottom-auto sm:left-auto sm:top-8 sm:h-px sm:w-6 lg:-bottom-3 lg:left-8 lg:right-auto lg:top-auto lg:h-6 lg:w-px" />}
                  </div>
                ))}
              </div>
              <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
                <p className="mb-4 text-sm text-cyan-100">Animated AI example</p>
                <div className="rounded-2xl bg-black/35 p-4 text-slate-200">“Camry пробег 121000 замена масла следующее ТО 131000”</div>
                <div className="my-6 flex items-center justify-center"><ChevronRight className="h-8 w-8 text-cyan-200" /></div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                  <div className="flex items-center gap-2 font-medium text-emerald-100"><CheckCircle2 className="h-5 w-5" /> AI parsed successfully</div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    <span>Авто: Toyota Camry</span><span>Пробег: 121 000</span><span>Событие: замена масла</span><span>Следующее ТО: 131 000</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeader eyebrow="Benefits" title="Контроль, который не зависит от памяти сотрудников" description="Премиальный набор функций для владельцев автопарков, логистики, сервисных служб и транспортных отделов." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([Icon, title, text]) => (
            <Reveal key={String(title)}>
              <Card className="group h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.08]">
                <Icon className="h-9 w-9 text-cyan-200 transition group-hover:scale-110" />
                <h3 className="mt-6 text-xl font-semibold">{String(title)}</h3>
                <p className="mt-3 leading-7 text-slate-300">{String(text)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <DashboardPreview />
      <HowItWorks />
      <Notifications />
      <Pricing />
      <Future />
      <FinalCta />
      <Footer />
    </main>
  );
}

function DashboardPreview() {
  const status = [["В работе", 89, "text-emerald-200"], ["В ремонте", 12, "text-amber-200"], ["Простой", 4, "text-red-200"], ["Документы", 7, "text-cyan-200"]];
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeader eyebrow="Live command center" title="Dashboard, который показывает реальность автопарка" description="Самая важная информация собрана в визуальную панель: ремонты, ТО, страховки, расходы, alert-лента и fleet status." />
      <Reveal className="mt-14">
        <Card className="overflow-hidden rounded-[2.5rem] p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
              <div className="mb-6 flex items-center justify-between"><h3 className="text-xl font-semibold">Fleet status</h3><Gauge className="text-cyan-200" /></div>
              <div className="grid gap-3 sm:grid-cols-4">
                {status.map(([label, value, color]) => <div key={String(label)} className="rounded-2xl bg-white/[0.05] p-4"><div className={cn("text-3xl font-semibold", String(color))}>{String(value)}</div><div className="mt-1 text-sm text-slate-400">{String(label)}</div></div>)}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="mb-4 flex items-center gap-2 text-slate-200"><LineChart className="h-5 w-5 text-cyan-200" /> Expenses analytics</div><div className="flex h-40 items-end gap-2">{[45, 72, 64, 92, 70, 86, 58, 98, 82, 104].map((h, i) => <div key={i} style={{ height: `${h}px` }} className="w-full rounded-t-lg bg-gradient-to-t from-violet-500 to-cyan-300" />)}</div></div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="mb-4 flex items-center gap-2 text-slate-200"><FileWarning className="h-5 w-5 text-amber-200" /> Upcoming ТО</div>{["Camry — 1 250 км", "Transit — 4 дня", "Rio — 2 800 км", "Next — сегодня"].map((x) => <div key={x} className="mb-2 rounded-xl bg-black/25 px-3 py-2 text-sm text-slate-300">{x}</div>)}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[2rem] border border-red-300/20 bg-red-400/[0.07] p-5"><h3 className="mb-4 font-semibold text-red-100">Alerts</h3>{["Expired insurance: 2", "ТО overdue: 3", "Inspection overdue: 1"].map((x) => <div key={x} className="mb-3 flex items-center gap-3 rounded-2xl bg-black/25 p-3 text-sm text-slate-200"><span className="h-2 w-2 rounded-full bg-red-300" />{x}</div>)}</div>
              <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5"><h3 className="mb-3 font-semibold text-cyan-100">AI activity</h3><p className="text-sm leading-6 text-slate-300">За последние 24 часа обработано 184 сообщения, найдено 16 событий и 5 критичных дедлайнов.</p></div>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

function HowItWorks() {
  return <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeader eyebrow="How it works" title="4 шага от сообщения до управленческого решения" description="Система построена так, чтобы команда не меняла привычки, а руководитель получал больше контроля." /><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{steps.map(([Icon, title, text], i) => <Reveal key={String(title)}><Card className="relative h-full p-6"><div className="mb-7 flex items-center justify-between"><Icon className="h-8 w-8 text-cyan-200" /><span className="text-5xl font-semibold text-white/10">0{i + 1}</span></div><h3 className="text-xl font-semibold">{String(title)}</h3><p className="mt-3 leading-7 text-slate-300">{String(text)}</p></Card></Reveal>)}</div></section>;
}

function Notifications() {
  return <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeader eyebrow="Real-time alerts" title="AI предупреждает до того, как проблема станет дорогой" description="Уведомления выглядят как live-лента операционного центра, а не как очередная забытая строка в таблице." /><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{notifications.map(([emoji, title, text, color]) => <Reveal key={String(title)}><Card className="h-full p-5 transition hover:-translate-y-1 hover:border-cyan-300/30"><div className="text-3xl">{emoji}</div><h3 className={cn("mt-5 font-semibold", String(color))}>{String(title)}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{String(text)}</p></Card></Reveal>)}</div></section>;
}

function Pricing() {
  const cards = [["Внедрение", "2 000 USD", ["dashboard", "MAX-бот", "AI parser", "automation", "Google Sheets integration"]], ["Поддержка", "100 USD / месяц", ["мониторинг", "обновления", "поддержка интеграций", "адаптация правил", "приоритетные консультации"]]];
  return <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeader eyebrow="Pricing" title="Прозрачная стоимость запуска AI-контура" description="MVP-архитектура под быстрый старт, проверку ценности и дальнейшее масштабирование на весь автопарк." /><div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">{cards.map(([name, price, items], i) => <Reveal key={String(name)}><Card className={cn("h-full p-7", i === 0 && "border-cyan-300/40 shadow-glow")}><p className="text-sm uppercase tracking-[0.3em] text-cyan-100">{String(name)}</p><div className="mt-5 text-4xl font-semibold tracking-tight">{String(price)}</div><ul className="mt-8 space-y-3">{(items as string[]).map((item) => <li key={item} className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-200" /> {item}</li>)}</ul><Button asChild className="mt-8 w-full" variant={i === 0 ? "neon" : "glass"}><a href="#contact">Запросить предложение</a></Button></Card></Reveal>)}</div></section>;
}

function Future() {
  return <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeader eyebrow="Scale-ready platform" title="Платформа может масштабироваться вместе с вашим бизнесом" description="После MVP систему можно развивать в полноценную операционную платформу с предиктивной аналитикой и глубокими интеграциями." /><Reveal className="mt-14"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{futureFeatures.map((item) => <div key={item} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-300/[0.04] p-5 text-slate-100 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-300/40"><Sparkles className="mb-5 h-5 w-5 text-violet-200" />{item}</div>)}</div></Reveal></section>;
}

function FinalCta() {
  return <section id="contact" className="px-5 py-24 lg:px-8"><Reveal><div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-white/[0.06] p-8 text-center shadow-glow backdrop-blur-2xl md:p-16"><div className="absolute inset-x-0 top-0 mx-auto h-40 w-2/3 rounded-full bg-cyan-400/20 blur-3xl" /><div className="relative"><h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Управляйте автопарком как современной AI-компанией</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">Снизьте хаос, сократите простои и получите полный контроль над автопарком.</p><div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"><Button asChild size="lg" variant="neon"><a href="mailto:hello@ai-fleet-control.com">Получить консультацию</a></Button><Button asChild size="lg" variant="glass"><a href="https://t.me/ai_fleet_control" target="_blank" rel="noreferrer">Запросить демонстрацию</a></Button></div></div></div></Reveal></section>;
}

function Footer() {
  return <footer className="border-t border-white/10 px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between"><div><div className="font-semibold text-white">AI Fleet Control</div><p className="mt-2">© 2026 AI Fleet Control. Все права защищены.</p></div><div className="flex flex-wrap gap-4"><a href="mailto:hello@ai-fleet-control.com" className="hover:text-white">Контакты</a><a href="https://t.me/ai_fleet_control" className="hover:text-white">Telegram</a><a href="https://wa.me/10000000000" className="hover:text-white">WhatsApp</a></div></div></footer>;
}
