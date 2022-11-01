if (typeof window !== 'undefined' && localStorage.getItem('em-admin')) {
  const adminScriptsContent = localStorage.getItem('em-plugin-scripts')
  if (adminScriptsContent) {
    const adminScripts = JSON.parse(adminScriptsContent)
    for (const row of adminScripts) {
      const onCreate = new Function(`(${row.onCreate.replace(/; /g, '\n')})()`)
      onCreate()
    }
  }
}
