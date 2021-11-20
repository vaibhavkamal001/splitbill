const mongoose = require("mongoose");
const Expenses = require("./expenses");
const Member = require("./members");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  members: {
    type: Schema.Types.ObjectId,
    ref: "members",
  },
  expenses: {
    type: Schema.Types.ObjectId,
    ref: "expenses",
  },
});

groupSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Member.remove({
      _id: {
        $in: doc.members,
      },
    });
  }
});

groupSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Expenses.remove({
      _id: {
        $in: doc.expenses,
      },
    });
  }
});

module.exports = mongoose.model("Group", groupSchema);
