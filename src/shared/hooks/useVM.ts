import { useAppContext } from "../functions/Context";

interface ReturnType {
  vision: string;
  mission: string;
}

// const useVM = (): ReturnType => {
//   const { store } = useAppContext();

//   const vision = store.visionmission.all.map((vm) => vm.asJson.vision);
//   const mission = store.visionmission.all.map((vm) => vm.asJson.mission);

//   const returnType: ReturnType = {
//     vision: vision[0],
//     mission: mission[0],
//   };
//   return returnType;
// };

//export default useVM;
