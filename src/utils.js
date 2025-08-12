// For lazy loading of external scripts
export const loadExternalScript = srcPath => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${srcPath}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = srcPath;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load the: ' + srcPath));

        document.body.appendChild(script);
    });
};
