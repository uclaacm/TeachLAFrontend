import { constructShareableSketchURL } from './sketch';

describe('constructShareableSketchURL', () => {
  it('works with localhost', () => {
    expect(constructShareableSketchURL('owo', 'localhost')).toBe('http://localhost:8080/p/owo');
  });
  it('works with editor.uclaacm.com', () => {
    expect(constructShareableSketchURL('owo', 'editor.uclaacm.com')).toBe(
      'https://editor.uclaacm.com/p/owo',
    );
  });
  it('somewhat gracefully handles no parameters', () => {
    expect(constructShareableSketchURL()).toBe('http://localhost:8080/p/undefined');
  });
  it('reads from window.location.hostname', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      hostname: 'not.a.real.domain',
    };
    expect(constructShareableSketchURL('owo')).toBe('https://not.a.real.domain/p/owo');
  });
});
