// https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237

const clearOutput = e => {
  if (e.target.nextElementSibling.outerHTML.indexOf('getResult') !== -1 || e.target.nextElementSibling.outerHTML.indexOf('postResult') !== -1) {
    e.target.nextElementSibling.innerHTML = '';
  }
};

const generateSuccessHTMLOutput = response => {
  return (
    '<h4>Result</h4>' +
    '<h5>Status:</h5> ' +
    '<pre>' +
    response.status +
    ' ' +
    response.statusText +
    '</pre>' +
    '<h5>Headers:</h5>' +
    '<pre>' +
    JSON.stringify(response.headers, null, '\t') +
    '</pre>' +
    '<h5>Data:</h5>' +
    '<pre>' +
    JSON.stringify(response.data, null, '\t') +
    '</pre>'
  );
};
const generateErrorHTMLOutput = error => {
  return (
    '<h4>Result</h4>' +
    '<h5>Message:</h5> ' +
    '<pre>' +
    error.message +
    '</pre>' +
    '<h5>Status:</h5> ' +
    '<pre>' +
    error.response.status +
    ' ' +
    error.response.statusText +
    '</pre>' +
    '<h5>Headers:</h5>' +
    '<pre>' +
    JSON.stringify(error.response.headers, null, '\t') +
    '</pre>' +
    '<h5>Data:</h5>' +
    '<pre>' +
    JSON.stringify(error.response.data, null, '\t') +
    '</pre>'
  );
};

const performGetRequest1 = () => {
  const resultElement = document.getElementById('getResult1');
  resultElement.innerHTML = '';

  (async () => {
    try {
      const response = await axios.get(
        'http://jsonplaceholder.typicode.com/todos'
      );
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    } catch (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    }
  })();
};

const performGetRequest2 = () => {
  const resultElement = document.getElementById('getResult2');
  const todoId = document.getElementById('todoId').value;
  resultElement.innerHTML = '';

  (async () => {
    try {
      const response = await axios.get(
        'http://jsonplaceholder.typicode.com/todos',
        {
          params: {
            id: todoId
          }
        }
      );
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    } catch (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    }
  })();
};

const performPostRequest = e => {
  e.preventDefault();

  const resultElement = document.getElementById('postResult');
  const todoTitle = document.getElementById('todoTitle').value;
  resultElement.innerHTML = '';

  (async () => {
    try {
      const response = await axios.post(
        'http://jsonplaceholder.typicode.com/todos',
        {
          userId: '1',
          title: todoTitle,
          completed: false
        }
      );
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    } catch (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    }
  })();
};

document
  .getElementById('todoInputForm')
  .addEventListener('submit', performPostRequest);

Array.prototype.slice
  .call(document.querySelectorAll('.btn-warning'))
  .forEach(element => {
    element.addEventListener('click', clearOutput);
  });
