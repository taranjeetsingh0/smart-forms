import { OptionsType } from "../components/Form/interface";

export function checkUniqueOptions(options: OptionsType[]) {
  const h: string[] = [];
  let isValid = true;


  for(let option of options) {
    if(h.includes(option.value)) {
      isValid = false;
      break;
    }
    else {
      h.push(option.value);
    }
  }
  return isValid;
}
