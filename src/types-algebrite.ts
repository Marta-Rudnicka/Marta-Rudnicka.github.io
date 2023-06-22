
/* types useful for algebrite library, which doesn't provide its own types.
These do not reflect the full structure of anything produce by algebrite - only
includes properties used in this codebase */ 

export type ComplexSolutions = {
  tensor: {
  elem: Array<ComplexSolution>
  }
};


export type Solutions = {
  tensor: {
  elem: Solution[]
  }
};

export type AlgebriteNumericValue = {
    d: number
}

export type Solution = AlgebriteNumericValue & ComplexSolution & ImaginarySolution

export type ComplexSolution = {
  cons: {
    cdr: {
      cons: {
        car: AlgebriteNumericValue,
        cdr: {
          cons: {
            car: {
              cons:
              {
                cdr: {
                  cons: {
                    car: AlgebriteNumericValue,
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export type ImaginarySolution =  {
  cons: {
    cdr: {
      cons: {
        car:{
          d: number
        }
      }
    }
  }
}
