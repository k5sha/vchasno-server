from sys import argv
import subprocess
import json
from progress.bar import Bar
from tabulate import tabulate

scripts, test_path, config_path = argv

# Тестовые данные и ожидаемые результаты
test_cases = []


def load_tests_conf(path):
    with open(path, "r") as f:
        data = json.load(f)
        f.close()
        for i in data["test"]:
            input_to_str = ''
            for inp in i["input"]:
                input_to_str += str(inp)+'\n'
            test_cases.append((input_to_str, i["output"]))


def run_tests():
    len_test = 0
    correct_test = 0

    table = []
    headers = ['ID', 'Статус', 'Результат', 'Повинно бути', 'Помилка']
    for n, (input_data, expected_output) in enumerate(test_cases, 1):
        print()
        cmd = f"py {test_path}"
        results = subprocess.run(
            cmd, input=input_data, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=1)
        if results.returncode == 0:
            results_array = results.stdout.strip().split("\n")
            bar = Bar('Тестую', max=len(results_array))
            for i, line in enumerate(results_array, 1):
                len_test += 1
                if (line == str(expected_output[i-1])):
                    correct_test += 1
                    table.append(
                        [f'{n}.{i}', '\033[32m Успішно\033[0m', line, expected_output[i-1], '-'])
                else:
                    table.append([f'{n}.{i}', '\033[31m Не пройшов\033[0m', line, expected_output[i-1],
                                 f'Отриманий результат: {line}, очікувана відповідь: {expected_output[i-1]}'])
                bar.next()
        else:
            table.append([f'{n}!', '\033[31m Фатальна помилка\033[0m', '-', '-',
                          results.stderr])

    print('\n\n\n'+tabulate(table, headers,
          tablefmt="simple_grid", numalign="center", stralign="center"))
    mark = [f'{round((correct_test/len_test)*12)}/12',
            f'{correct_test}/{len_test}', f'{round((correct_test/len_test)*100)}', test_path]
    print(
        tabulate([mark], ['Оцінка', 'Кількість правильних', '%', 'Файл'],
                 tablefmt="simple_grid", numalign="center", stralign="center"))


if __name__ == '__main__':
    load_tests_conf(config_path)
    run_tests()
