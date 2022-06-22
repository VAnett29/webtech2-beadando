module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: String,
          sex: String,
          born: Date,
          color: String,
          height: Number
        },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Horse = mongoose.model("horse", schema);
    return Horse;
  };