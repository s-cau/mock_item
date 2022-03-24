class SimplePost {
  getInfo () {
    return {
      id: 'simplePost',
      name: 'SimplePost',
      blocks: [
        {
          opcode: 'get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'GET [TEXT]',
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

  get (args) {
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
			response.json().then(data => JSON.stringify("Gli ominidi (Hominidae Gray, 1825), sono una famiglia di primati risalente al Miocene inferiore. A questa famiglia appartengono gli esseri umani e gran parte delle scimmie antropomorfe: oranghi, gorilla e scimpanzé, oltre ad alcuni gruppi fossili, tra i quali gli australopitechi. Fino ai primi anni sessanta venivano classificati come ominidi solo l\'uomo e generi estinti ritenuti appartenenti alla linea evolutiva umana; per questo il termine viene talvolta ancora usato nel linguaggio comune con tale significato, mentre adesso tali specie costituiscono la sottotribù Hominina.")));
   return response;
  }
}

Scratch.extensions.register(new SimplePost());
