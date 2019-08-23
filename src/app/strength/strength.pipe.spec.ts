import {StrengthPipe} from './strength.pipe';

describe('Strength Pipe', () =>  {

  const pipe = new StrengthPipe();

  it('should display weak if strength is less than 10', () => {
    expect(pipe.transform(5)).toEqual('5 (weak)') ;
  });

  it('should display strong if strength is 10', () => {
    expect(pipe.transform(10)).toEqual('10 (strong)') ;
  });

  it('should display unbelieve if strength is more than 10', () => {
    expect(pipe.transform(20)).toEqual('20 (unbelievable)') ;
  });

});
