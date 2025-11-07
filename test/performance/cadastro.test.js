import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
    iterations: 10,
    thresholds: {
        http_req_duration: ['p(95)<500', 'max<1000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const url = 'http://localhost:3000/api/gerente/registrar';
    const payload = JSON.stringify({
        nome: 'Matheus',
        email: 'matheusperformance@email.com',
        senha: '123456',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.post(url, payload, params);

    check(resposta, {
        'Status é 201': (r) => r.status === 201,
        'resposta tem id': (r) => r.json().hasOwnProperty('id'),
    });

    sleep(1);
}