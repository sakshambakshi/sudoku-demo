import generator from "sudoku";
// this library provide utils for sudoku keep in mind it gives 0 - 8 rather that 1 - 8
//window.generator = generator; // done for testing

export function generateSudoku() {
  //Create a fuction that generate the sudoku board for you .

  /**
 * Generate a Sudoku   with the structure 
 * 
 * 


   {rows:[
     {cols: [
       {row:0 , col:0 value:1, readonly:true }
     ]}
   ]}
 */
  const fromUrl = extractFromUrl();
  const raw = fromUrl ? fromUrl.raw : generator.makepuzzle();
  const result = {
    rows: [],
    raw,
    challengeSolveTime: !!fromUrl ? fromUrl.solvedTime : false,
    challengeStartTime: !!fromUrl ? fromUrl.startTime : false,
  };
  result.solution = generator.solvepuzzle(raw).map((e) => e + 1);
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const col = {
        row: i,
        col: j,
        value: raw[i * 9 + j] !== null ? raw[i * 9 + j] + 1 : "",
        readonly: raw[i * 9 + j] !== null,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }

  result.startTime = new Date();
  result.solvedTime = null;
  return result;
}
export function checkSolution(sudoku) {
  const candidate = sudoku.rows
    .map((row) => row.cols.map(({ value }) => value))
    .flat();
  for (let i = 0; i < candidate.length; i++) {
    // eslint-disable-next-line
    if (candidate[i] === "" || sudoku.solution[i] != candidate[i]) {
      return false;
    }
  }
  return true;
}

export function shareUrl(sudoku) {
  const data = {
    raw: sudoku.raw,
    startTime: sudoku.startTime,
    solvedTime: sudoku.solvedTime,
  };
  const query = btoa(JSON.stringify(data));
  return document.location.href.replace(/\?.+$/, "") + "?sudoku=" + query;
}

export function extractFromUrl() {
  debugger;
  const match = document.location.search.split("?sudoku=");
  if (match.length >= 2) {
    return JSON.parse(atob(match[1]));
  }
  return null;
}
