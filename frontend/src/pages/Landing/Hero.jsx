import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { fadeUp, stagger } from "../../utils/motion";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-primary shadow-sm"
          >
            <Sparkles size={16} aria-hidden="true" />
            AI-powered accessibility platform
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            Communicate Without Barriers
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg leading-relaxed text-muted text-pretty"
          >
            Translate sign language, speech and text instantly using AI while
            learning sign language in one intelligent platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/register")}
            >
              {" "}
              Get Started
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {" "}
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm">
            <img
              src={`${import.meta.env.BASE_URL}hero-illustration.png`}
              alt="Two people communicating through sign language, speech and text translated by AI"
              className="h-auto w-full rounded-2xl"
              width={800}
              height={600}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
