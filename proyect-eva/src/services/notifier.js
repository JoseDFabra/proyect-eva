import { toast } from "react-hot-toast";
export function notifier(text, type){
  if(toast[type]){
    toast[type](text,{
      position:"bottom-right",
      style: {
        background: `#f8f8f8`,
        color: "#000"
      }
    }); 
  }
  else{
    return
  }
}
