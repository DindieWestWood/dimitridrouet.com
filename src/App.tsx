import "./App.scss";
import { useEffect, useRef, useState } from "react";
import ProjectService from "./services/project.service";
import LoaderSection, { LoaderSectionControl } from "./sections/loader/loader.section";
import IProject from "./interfaces/project.interface";
import FileService from "./services/file.service";
import Button from "./components/button/Button";
import ScrollService from "./services/scroll.service";
import { ArrowDownToDot } from "lucide-react";

function App(){
  //const cursorRef = useRef<CursorControl>(null);
  const loaderSectionRef = useRef<LoaderSectionControl>(null);
  const loadingProgressCounterRef = useRef<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const projectsRef = useRef<IProject[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    loadingProgressCounterRef.current = 0;
    ProjectService.instance.getProjects().subscribe({
      next: res => {
        projectsRef.current = res;
        loadImages();
      },    
      error: error => console.error(error)
    });
  }, []);

  const loadImages = () => {
    projectsRef.current.forEach((project) => {
      if (project.imagesRefs && project.imagesRefs.length > 0) {
        FileService.instance.getImage(`projects/${project.id}/${project.imagesRefs[0]}`).subscribe({
          next: img => {
            console.log(img)
            handleImagePreloaded(); 
          },
          error: error => {
            console.log(error);
            handleImagePreloaded();
          }
        });
      } 
    });
  }

  const handleImagePreloaded = () => {
    loadingProgressCounterRef.current ++;
    setLoadingProgress(loadingProgressCounterRef.current/projectsRef.current.length);

    if (loadingProgressCounterRef.current === projectsRef.current.length && loaderSectionRef?.current) {
      setProjects(projectsRef.current);
      loaderSectionRef?.current.close(handleLoaderSectionClosed);
    }
  }

  const handleLoaderSectionClosed = () => {
    
  }


  return (
    <>
      <main role="main">
        <LoaderSection ref={loaderSectionRef} loadingPercentage={Math.floor(loadingProgress * 100)}/>
        { projects && projects.length > 0 ?
            <>
              <section id="cover-section">
                <div>
                  <p className="index" aria-hidden="true">001/</p>
                  <h1 className="display">Hey! <span className="emoji waving-hand" aria-hidden="true">👋</span> Nice to see you!</h1>
                  <p id="headline-description">Welcome to my website! I'm Dimitri I'm a UI/UX Designer, Poladict, Podcasts Maker and Music Enthousiatic.</p>
                </div>
                
                <Button handleClick={() => ScrollService.instance.scrollTo('#work-grid')}>
                  <span>Next</span>
                  <ArrowDownToDot size={20} strokeWidth={2} />
                </Button>
      
                <div id="scroll-invite" aria-hidden="true">
                  <p>Scroll</p>
                </div>
              </section>
              <section id="projects-section">
                <p className="index" aria-hidden="true">002/</p>
                <h2 id="work-grid" className="display">Projects</h2>
              </section>
            </> : ''}

        
      </main>
      {/* <Cursor ref={cursorRef}/> */}
    </>
  )
}

export default App
