import { faPython, faHtml5, faReact } from '@fortawesome/free-brands-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import CreateProcessingDoc from './Processing';
import CreatePythonDoc from './Python';
import CreateReactDoc from './React';

export const SUPPORTED_LANGUAGES = [
  {
    value: 'python',
    display: 'Python',
    icon: faPython,
    codemirror: 'python',
    extension: 'py',
    render: CreatePythonDoc,
  },
  //   {
  //     value: "javascript",
  //     display: "JavaScript",
  //     icon: faJs,
  //     codemirror: "javascript",
  //     extension: "js",
  //   },
  {
    value: 'html',
    display: 'HTML',
    icon: faHtml5,
    codemirror: 'htmlmixed',
    extension: 'html',
  },
  {
    value: 'processing',
    display: 'Processing',
    icon: faCogs,
    codemirror: 'javascript',
    extension: 'html',
    render: CreateProcessingDoc,
    renderDownload: CreateProcessingDoc,
  },
  {
    value: 'react',
    display: 'React.JS',
    icon: faReact,
    codemirror: 'jsx',
    extension: 'html',
    render: CreateReactDoc,
    renderDownload: CreateReactDoc,
  },
];

const DEFAULT_LANGUAGE = {
  identifier: 'txt',
  display: 'Text',
  codemirror: undefined,
  extension: 'txt',
  render: (code) => code,
  renderDownload: (code) => code,
};

export const getLanguageData = (lang) => ({
  ...DEFAULT_LANGUAGE,
  ...SUPPORTED_LANGUAGES.find((data) => data.value === lang),
});

export const enrichWithLanguageData = (arr) => arr.map((sketch) => ({
  ...sketch,
  language: getLanguageData(sketch.language),
}));
