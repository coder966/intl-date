const benchmark = (name: string, cycles: number, task: () => void) : void => {
  const t0 = Date.now();
  for(let i = 0; i < cycles; i++){
    task();
  }
  const t1 = Date.now();
  console.log(`Executed ${name} ${cycles.toLocaleString()} times in ${(t1-t0).toLocaleString()} ms`);
}

export default benchmark;
