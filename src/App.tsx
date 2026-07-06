import {
  DiscordLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  QuestionIcon,
  ReadCvLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogSection from "./components/BlogSection";
import LinkButton from "./components/LinkButton";
import PostPage from "./components/PostPage";
import ProjectsSection from "./components/ProjectsSection";
import ScrollHint from "./components/ScrollHint";
import { allPosts } from "./content/posts";
import { trackGlow } from "./utils/glow";

export default function App() {
  const route = useHashRoute();
  const postSlug = route.match(/^\/posts\/(.+)$/)?.[1];
  const post = allPosts.find((item) => item.slug === postSlug);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const ctrl = event.metaKey || event.ctrlKey;

      if (event.key.toLowerCase() !== "s" || !ctrl) {
        return;
      }

      event.preventDefault();
      toast.info("File saved... wait, what?", {
        autoClose: 2000,
        pauseOnHover: false,
        hideProgressBar: true,
        icon: () => <QuestionIcon />,
      });
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (post) {
    return <PostPage post={post} />;
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <section className="relative h-screen w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="relative w-screen px-4 text-center lg:w-[890px]">
            <h1 className="absolute -top-[142px] left-1/2 w-full -translate-x-1/2 transform text-nowrap text-[36px] font-bold md:text-[48px] lg:text-[64px]">
              Serhii Nesterov
            </h1>
            <h2 className="absolute -top-[72px] left-1/2 w-full -translate-x-1/2 transform text-xs lg:-top-[64px] lg:text-sm">
              Software engineer. Smart Contract and Backend developer
            </h2>

            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="glow-card relative grid w-full grid-cols-1 items-center gap-4 rounded-4xl bg-[#393E46] px-6 py-5 text-left ring-1 ring-[#e1dace40] transition-transform duration-200 ease-out will-change-transform max-md:h-fit max-md:min-h-[180px] sm:grid-cols-2 md:min-h-[90px] md:grid-cols-4 lg:px-4"
            >
              <div className="glow-overlay" />
              <img
                src="/image/reach-me-here.svg"
                alt="Reach me here"
                height={346}
                width={326}
                className="pointer-events-none absolute right-[710px] top-[40px] hidden xl:block"
              />
              <LinkButton
                className="group justify-center md:justify-start"
                text="Sergio-prog"
                link="https://github.com/Sergio-prog"
                tooltip="Github"
              >
                <GithubLogoIcon className="h-7 w-7 group-hover:animate-(--animate-small-bounce) lg:h-8 lg:w-8" />
              </LinkButton>

              <LinkButton
                className="group justify-center md:justify-start"
                text="@0xFotex"
                link="https://x.com/0xFotex"
                tooltip="Twitter"
              >
                <XLogoIcon className="h-7 w-7 group-hover:animate-(--animate-small-bounce) lg:h-8 lg:w-8" />
              </LinkButton>

              <LinkButton
                className="group justify-center md:justify-start"
                text="@fotex"
                link="@fotex"
                isCopiable
                tooltip="Discord username"
              >
                <DiscordLogoIcon className="h-7 w-7 group-hover:animate-(--animate-small-bounce) lg:h-8 lg:w-8" />
              </LinkButton>

              <LinkButton
                className="group justify-center md:justify-start"
                text="sergey-nesterov"
                link="https://www.linkedin.com/in/sergey-nesterov/"
                tooltip="Linkedin"
              >
                <LinkedinLogoIcon className="h-7 w-7 group-hover:animate-(--animate-small-bounce) lg:h-8 lg:w-8" />
              </LinkButton>

              <LinkButton
                className="group justify-center md:justify-start"
                text="My CV"
                link="/cv.pdf"
                tooltip="Curriculum vitae"
              >
                <ReadCvLogoIcon className="h-7 w-7 duration-150 group-hover:-rotate-10 group-hover:animate-(--animate-small-bounce) lg:h-8 lg:w-8" />
              </LinkButton>
            </div>
            <div className="relative mt-1">
              <p className="bg-gradient-to-b from-[#393E46]/50 to-[#393E46]/20 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                I`m too lazy to make a good design. sry {":)"}
              </p>
            </div>
          </div>
        </div>
        <ScrollHint />
      </section>
      <ProjectsSection />
      <BlogSection />
      <footer className="px-4 pb-10 pt-6 text-center text-xs text-[#dfd0b8]/35">
        © {new Date().getFullYear()} Serhii Nesterov
      </footer>
    </main>
  );
}

function handleCardMouseMove(event: React.MouseEvent<HTMLDivElement>) {
  trackGlow(event);

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const tiltX = ((y - rect.height / 2) / rect.height) * -3.5;
  const tiltY = ((x - rect.width / 2) / rect.width) * 3.5;

  card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}

function handleCardMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
  event.currentTarget.style.transform = "";
}

function useHashRoute() {
  const [route, setRoute] = useState(() =>
    window.location.hash.replace(/^#/, "")
  );

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = window.location.hash.replace(/^#/, "");

      setRoute(nextRoute);

      if (nextRoute.startsWith("/posts/")) {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return route;
}
