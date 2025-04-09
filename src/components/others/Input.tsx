const Input = ({ className,type,placeholder,onchange }:{className?:string,type:string,placeholder:string,onchange?:() => void }) => {
    return (
      <input
        type={`${type}`}
        placeholder={`${placeholder}`}
        className={`${className}`}
        onChange={onchange}
      >
      </input>
    );
  };
  
  export default Input;