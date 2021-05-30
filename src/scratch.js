const deleteProject = docId => {
  firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
          setProjects([...projects]);
          setSelectedProject('INBOX');
      });
};