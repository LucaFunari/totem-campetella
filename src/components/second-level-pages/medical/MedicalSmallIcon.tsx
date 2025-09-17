import React from "react";

function MedicalSmallIcon({
  title,
  iconURL,
}: {
  title: string;
  iconURL?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="aspect-square h-52">
        <img
          src={iconURL}
          className={`${iconURL ? "opacity-100" : "opacity-0"} h-full w-full scale-150 object-contain transition-opacity`}
        />
      </div>
      <span
        className="line-clamp-3 w-full break-words text-center font-d-din text-[2.5rem] font-medium leading-[3rem]"
        dangerouslySetInnerHTML={{ __html: title }}
      ></span>
    </div>
  );
}

export default MedicalSmallIcon;

//  return (
//     <div className="flex w-full flex-col items-center gap-5">
//       <div className="aspect-square h-64">
//         {isLoading ? (
//           <div className="h-full w-full opacity-40"></div>
//         ) : (
//           <img
//             onLoad={() => setLoaded(true)}
//             src={asset?.source_url}
//             className={`${loaded ? "opacity-100" : "opacity-0"} h-full w-full scale-150 object-contain transition-opacity`}
//           />
//         )}
//       </div>
//       <span className="line-clamp-2 w-full break-words text-center font-d-din text-content font-bold uppercase">
//         {props.icon.acf.nome}
//       </span>
//     </div>
//   );
