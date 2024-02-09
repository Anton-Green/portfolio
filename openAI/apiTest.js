apiTest();
function apiTest() {
    import axios from 'axios';


    const apiKey = 'my_secret_key';
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const data = {
        prompt: 'Once upon a time,',
        max_tokens: 50,
        engine: 'gpt-3.5-turbo' // can use either dalle, whisper or gpt4
    };

    axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', data, { headers })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error.response.status, error.response.data);
        });
}