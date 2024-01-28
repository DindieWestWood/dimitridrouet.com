import Cursor from "./components/cursor/Cursor";
import CoverSection from "./sections/cover/cover.section";

export default function App() {
  
  
  return (
    <> 
      <CoverSection nextSelector={''}/>
      <Cursor/>
    </>
  );
}

// import { useEffect, useRef, useState } from "react";
// import LoaderSection, { LoaderSectionControl } from "./sections/loader/loader.section";
// import FileService from "./services/file.service";
// import CoverSection from "./sections/cover/cover.section";
// import WorkSection, { IDS } from "./sections/work/work.section";
// import Cursor from "./components/cursor/Cursor";
// import WorkService from "./services/work.service";
// import IThumbnailWork from "./interfaces/thumbnail-work.interface";

// function App(){
//   const loaderSectionRef = useRef<LoaderSectionControl>(null);
//   const loadingProgressCounterRef = useRef<number>(0);
//   const [loadingProgress, setLoadingProgress] = useState<number>(0);
//   const workListRef = useRef<IThumbnailWork[]>([]);
//   const [workList, setWorkList] = useState<IThumbnailWork[]>([]);

//   useEffect(() => {
//     loadingProgressCounterRef.current = 0;
//     WorkService.instance.getAllWork().subscribe({
//       next: res => {
//         workListRef.current = res;
//         loadImages();
//       },    
//       error: error => console.error(error)
//     });
//   }, []);

//   const loadImages = () => {
//     workListRef.current.forEach((work) => {
//       if (work.imagesRefs && work.imagesRefs.length > 0) {
//         FileService.instance.getImage(`projects/${work.id}/${work.imagesRefs[0]}`).subscribe({
//           next: img => {
//             console.log(img);
//             handleImagePreloaded(work, img); 
//           },
//           error: error => {
//             console.log(error);
//             handleImagePreloaded(work);
//           }
//         });
//       } 
//     });
//   }

//   const handleImagePreloaded = (work: IThumbnailWork, img?: string) => {
//     loadingProgressCounterRef.current ++;
//     setLoadingProgress(loadingProgressCounterRef.current/workListRef.current.length);
//     work.thumbnail = img;

//     if (loadingProgressCounterRef.current === workListRef.current.length && loaderSectionRef?.current) {
//       setWorkList(workListRef.current);
//       loaderSectionRef?.current.close(handleLoaderSectionClosed);
//     }
//   }

//   const handleLoaderSectionClosed = () => {
    
//   }


//   return (
//     <>
//       <main role="main">
//         <LoaderSection ref={loaderSectionRef} loadingPercentage={Math.floor(loadingProgress * 100)}/>
//         { workList && workList.length > 0 ?
//             <>
//               <CoverSection nextSelector={`#${IDS.SECTION}`} />
//               <WorkSection workList={workList}/>
//               <Cursor />
//             </> : ''}
//       </main>
//     </>
//   )
// }

// export default App
