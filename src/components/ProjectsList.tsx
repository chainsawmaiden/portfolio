import Link from "next/link";
import { Project } from "@/sanity/lib/projects";

interface ProjectsListProps {
  title: string;
  projects: Project[];
  type: 'product' | 'craft';
}

export default function ProjectsList({ title, projects, type }: ProjectsListProps) {
  return (
    <div className="stacked intro-list-stacked">
      <h3>{title}</h3>
      <div className="stacked intro-list-items">
        {projects.map((project) => (
          <Link key={project._id} href={`/${project.slug.current}`}>
            {project.listTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}