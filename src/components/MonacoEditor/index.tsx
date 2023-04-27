import { useEffect, useMemo, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { MonacoEditorProps } from './types';
import { noop, processSize } from './utils';

(self as any).MonacoEnvironment = {
  getWorker(_: any, label: any) {
    if (label === 'json') {
      return new JsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new CssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new HtmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new TsWorker();
    }
    return new EditorWorker();
  },
};

const MonacoEditor = ({
  width,
  height,
  value,
  defaultValue,
  language,
  theme,
  options,
  onChange,
  className,
}: MonacoEditorProps) => {
  const containerElement = useRef<HTMLDivElement | null>(null);

  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const fixedWidth = processSize(width || '');

  const fixedHeight = processSize(height || '');

  const style = useMemo(
    () => ({
      width: fixedWidth,
      height: fixedHeight,
    }),
    [fixedWidth, fixedHeight]
  );

  const initMonaco = () => {
    const finalValue = value !== null ? value : defaultValue;
    if (!editor.current && containerElement.current) {
      const finalOptions = { ...options };
      editor.current = monaco.editor.create(containerElement.current, {
        value: finalValue,
        language,
        ...(className ? { extraEditorClassName: className } : {}),
        ...finalOptions,
        ...(theme ? { theme } : {}),
      });
      editor.current.onDidChangeModelContent((event) => {
        onChange && onChange(editor.current?.getValue() || '', event);
      });
    }
  };

  useEffect(() => {
    initMonaco();
    editor.current?.focus();
  }, []);

  useEffect(() => {
    editor.current?.layout();
  }, [width, height]);

  useEffect(() => {
    monaco.editor.setTheme(theme || '');
  }, [theme]);

  useEffect(() => {
    if (editor.current) {
      const model: any = editor.current.getModel();
      monaco.editor.setModelLanguage(model, language || '');
    }
  }, [language]);

  return (
    <div
      ref={containerElement}
      style={style}
    />
  );
};

MonacoEditor.defaultProps = {
  width: '100%',
  height: '100%',
  value: null,
  defaultValue: '',
  language: 'javascript',
  theme: null,
  options: {},
  onChange: noop,
  className: null,
};

export default MonacoEditor;
