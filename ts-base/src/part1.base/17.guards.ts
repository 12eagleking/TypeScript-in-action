enum Type { Strong, Weak }

class Java {
  helloJava() {
    console.log('Hello Java')
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  js: any
}

function isJava(lang: Java | JavaScript): lang is Java {
  // return (lang as Java).java !== undefined
  return (<Java>lang).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  if ((<Java>lang).helloJava) {
  // if ((lang as Java).helloJava) {
    (lang as Java).helloJava()
  } else {
    (lang as JavaScript).helloJavaScript()
  }

  // instanceof
  if ((lang instanceof Java) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  // in
  if ('helloJava' in lang) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  // typeof
  if (typeof x === 'string') {
    x.length
  }

  return lang
}

getLanguage(Type.Weak, 1)