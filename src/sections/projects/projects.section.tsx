import "./projects.section.scss"

export interface ProjectsSectionProps {}

export default function ProjectsSection ({} : ProjectsSectionProps) {
  return (
    <section id="projects-section">
      <p className="index" aria-hidden="true">002/</p>
      <h2 id="work-grid" className="display">Projects</h2>
    </section>
  );
}