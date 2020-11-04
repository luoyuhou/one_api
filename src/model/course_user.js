module.exports = class extends think.Model {
  get relation() {
    return {
      course: {
        type: think.model.HAS_MANY,
        key: course_id,
        fKey: id
      }
    }
  }
};
