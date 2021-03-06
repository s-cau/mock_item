class NeuralSearch {
  getInfo () {
    return {
      id: 'neuralSearch',
      name: 'NeuralSearch',
      blocks: [
        {
          opcode: 'search',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Search [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        }
      ]
    };
  }

  search (args) {
	const raw = JSON.stringify({
	  "language": "ITA",
	  "query": args.TEXT,
	  "finder": "bm25",
	  "analyzer": "mrm8488/bert-italian-finedtuned-squadv1-it-alfa",
	  "num_answers": 5
	});

	const requestOptions = {
	  method: 'POST',
	  headers: {"Content-Type": "application/json, charset=UTF-8"},
	  body: raw
	 };

	let response = fetch("http://172.31.26.100:5007/neural_search/neural_search", requestOptions).then(response => 
			response.json().then(data => JSON.stringify(data.results[0].content)));
   return response;
  }
}

Scratch.extensions.register(new NeuralSearch());
