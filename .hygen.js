module.exports = {
  helpers: {
    component(name) {
      const hasPath = name.includes('/');
      const path = hasPath ? name.replace(/\/[^/]+?$/g, '/') : '';
      const filename = hasPath ? name.split(/\//g).pop() : name;
      const prefix = filename.slice(0, 5).toLowerCase() === 'base-' ? '_' : '';

      return { path, name: prefix + filename };
    }
  }
};
