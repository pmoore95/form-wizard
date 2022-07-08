export const convertToSnakeCase: (str:string)=>string = (str: string) =>
{
  return str.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

export const convertToKebabCase: (str:string)=>string = (str: string) =>
{
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();
}

export const ucwords: (str: string)=>string = (str: string) => {
  return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
}
