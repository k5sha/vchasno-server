import subprocess

import json


# Путь к тестируемому файлу
test_file = "test.py"

# Тестовые данные и ожидаемые результаты
test_cases = []


def load_tests_conf(path):
    with open("test_data.json", "r") as f:
        data = json.load(f)
        f.close()

    for i in data["test"]:
        format_input = ''
        for inp in i["input"]:
            format_input += str(inp)+'\n'
        test_cases.append((format_input, i["output"]))


def run_tests():
    for i, (input_data, expected_output) in enumerate(test_cases, 1):
        cmd = f"py {test_file}"
        results = subprocess.run(
            cmd, input=input_data, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if results.returncode == 0:
            for n, (result) in enumerate(results.stdout.strip().split('\n')):
                if (str(result) != str(expected_output[n])):
                    print(
                        f"Тест {i}.{n}: Не пройден. Полученный результат: {result}, Ожидался результат: {expected_output[n]}")
                    break
                else:
                    print(f"Тест {i}.{n}: пройден.")
        else:
            print(
                f"Тест {i}: Не пройден. Полученный результат: {result.stdout.strip()}, Ожидался результат: {expected_output}")


if __name__ == '__main__':
    load_tests_conf('./test_data.json')
    run_tests()
