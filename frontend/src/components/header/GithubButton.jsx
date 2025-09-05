import { FaGithub } from "react-icons/fa";

export default function GithubButton() {
  return (
    <a
      href="https://github.com/nathan8b/cv-app"
      target="_blank"
      rel="noopener noreferrer"
      className="github-button"
    >
      <FaGithub size={35} />
    </a>
  );
}