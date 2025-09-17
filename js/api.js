const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });

  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return method === Method.GET ? await response.json() : null;
};

const getData = async () => await load(Route.GET_DATA);

const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
