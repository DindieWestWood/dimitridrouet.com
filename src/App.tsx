import "./App.scss";
import { useEffect, useRef, useState } from "react";
import LoaderSection, { LoaderSectionControl } from "./sections/loader/loader.section";
import IWork from "./interfaces/work.interface";
import FileService from "./services/file.service";
import CoverSection from "./sections/cover/cover.section";
import WorkSection from "./sections/work/work.section";
import Cursor from "./components/cursor/Cursor";
import WorkService from "./services/work.service";

function App(){
  //const cursorRef = useRef<CursorControl>(null);
  const loaderSectionRef = useRef<LoaderSectionControl>(null);
  const loadingProgressCounterRef = useRef<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const workListRef = useRef<IWork[]>([]);
  const [workList, setWorkList] = useState<IWork[]>([]);

  useEffect(() => {
    loadingProgressCounterRef.current = 0;
    WorkService.instance.getAllWork().subscribe({
      next: res => {
        workListRef.current = res;
        loadImages();
      },    
      error: error => console.error(error)
    });
  }, []);

  const loadImages = () => {
    workListRef.current.forEach((work) => {
      if (work.imagesRefs && work.imagesRefs.length > 0) {
        FileService.instance.getImage(`projects/${work.id}/${work.imagesRefs[0]}`).subscribe({
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
    setLoadingProgress(loadingProgressCounterRef.current/workListRef.current.length);

    if (loadingProgressCounterRef.current === workListRef.current.length && loaderSectionRef?.current) {
      setWorkList(workListRef.current);
      loaderSectionRef?.current.close(handleLoaderSectionClosed);
    }
  }

  const handleLoaderSectionClosed = () => {
    
  }


  return (
    <>
      <main role="main">
        <LoaderSection ref={loaderSectionRef} loadingPercentage={Math.floor(loadingProgress * 100)}/>
        { workList && workList.length > 0 ?
            <>
              <CoverSection nextSelector={'#work-grid'} />
              <WorkSection />
              <Cursor />
            </> : ''}

        
      </main>
    </>
  )
}

export default App
