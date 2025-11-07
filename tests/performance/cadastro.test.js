import http from 'k6/http';
import { check, sleep } from 'k6';

const postCadastro = JSON.parse(open('../fixtures/postCadastro.json'));

export const options = {
    stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
    const url = `${BASE_URL}/api/gerente/registrar`;

    const payload = JSON.stringify(postCadastro);

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const resposta = http.post(url, payload, params);

    check(resposta, {
        'Status é 201': (r) => r.status === 201,
        'Resposta tem id': (r) => r.json() && r.json().hasOwnProperty('id'),
    });

    sleep(1);
}
