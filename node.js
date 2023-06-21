const node = (value = null, nextNode = null) => ({
  data: value,
  nextNode,
});

export default node;
