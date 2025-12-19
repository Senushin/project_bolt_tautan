# Implementation Plan: Custom Modals & Notifications

## Goal
Implement a high-fidelity, custom "Cyber-Security Dark" modal and notification system. Implement specific user flows for Firmware Update, PIN Management, and Factory Reset with precise text as requested.

## User Review Required
*   [ ] **Confirm Modal Texts:** Please review the "Modal & Notification Texts" section below to ensure the wording matches your expectations.

## Proposed Changes

### 1. UI Changes in `PinView`
*   **New Field:** Add "Повторите новый PIN" (Confirm New PIN) input field.
*   **Button Rename:** Change "Update" to "Обновить PIN".
*   **Button Rename:** Change "Reset Device" to "Сброс устройства".

### 2. Implementation of Components
*   **`Modal` Component:** Reusable, supports different variants (Success, Error, Info, Warning).
*   **`Toast` Component:** Floating notifications for validation errors.
*   **Icon Style:**
    *   **Base:** Lucide React (Stroke width 1.5px).
    *   **Palette:** White/Zinc-400 for structure.
    *   **Accent:** `#a771fe` (Purple) used for active states, glows, or secondary elements within icons (e.g., arrows in Replug icon).

### 3. Modal & Notification Texts (Detailed List based on Mockups)

#### A. Процесс: Обновление ПО (Firmware Update)
*   **Trigger:** Нажатие кнопки "Проверить обновления".
*   **Modal 1 (Поиск):**
    *   *Заголовок:* "Поиск обновлений" (Спиннер).
*   **Modal 2 (Доступно обновление):**
    *   *Заголовок:* "Доступна новая версия прошивки!"
    *   *Текст слева:* "Советуем обновиться для доступа к новым функциям и поддержанию безопасности устройства"
    *   *Текст справа:* "Актуальная версия \n **1.17**"
    *   *Кнопка:* "Начать установку" (Blue/Primary).
*   **Modal 3 (Шаг 1 - Touch):**
    *   *Заголовок:* "Обновление"
    *   *Текст:* "Нажмите на кнопку на устройстве и следуйте дальнейшим инструкциям"
    *   *Анимация:* Иконка отпечатка/сенсора.
*   **Modal 4 (Шаг 2 - Progress):**
    *   *Заголовок:* "Обновление"
    *   *Текст:* "Не отключайте устройство пока не завершится обновление!"
    *   *Центр:* Спиннер загрузки.
    *   *Справа:* Иконка USB.
*   **Modal 5 (Финал):**
    *   *Заголовок:* "Обновление"
    *   *Текст:* "Обновление успешно установлено"
    *   *Справа:* Большая зеленая галочка.
    *   *Кнопка:* "Понятно".

#### B. Процесс: Управление PIN (PIN Management)
*   **Validation Error (Уведомление/Toast):**
    *   Если поля пустые: "Заполните все поля".
    *   Если пароли не совпадают: "PIN-коды не совпадают".
*   **Modal 1 (Успех):**
    *   *Заголовок:* "Установка PIN"
    *   *Текст:* "PIN успешно изменен"
    *   *Справа:* Зеленая галочка.
    *   *Кнопка:* "Понятно".
*   **Modal 2 (Ошибка):**
    *   *Заголовок:* "Установка PIN"
    *   *Текст:* "Ошибка ввода старого пин-кода\nОсталось попыток:\n2"
    *   *Центр:* Большой красный крестик (X).
    *   *Кнопка:* "Понятно".

#### C. Процесс: Сброс устройства (Factory Reset)
*   **Trigger:** Нажатие кнопки "Сброс устройства".
*   **Modal 1 (Предупреждение):**
    *   *Заголовок:* "Сбросить FIDO ключи?"
    *   *Текст:* "Вы уверены? Это действие сотрёт все ключи и сбросит PIN код."
    *   *Текст 2 (акцент):* "Это действие не может быть отменено!"
    *   *Кнопки:* "Нет" (Зеленая), "Да" (Оранжевая).
*   **Modal 2 (Действие - Переподключение):**
    *   *Заголовок:* "Сброс FIDO ключей"
    *   *Текст:* "Вытащите и обратно вставьте ключ"
    *   *Иконка:* Стрелки (Replug) + USB.
*   **Modal 3 (Действие - Touch):**
    *   *Заголовок:* "Сброс FIDO ключей"
    *   *Текст:* "Нажмите на кнопку на устройстве и следуйте дальнейшим инструкциям"
    *   *Иконка:* Сенсор/Touch.
*   **Modal 4 (Финал):**
    *   *Заголовок:* "Сброс FIDO ключей"
    *   *Текст:* "Ключи успешно сброшены"
    *   *Справа:* Зеленая галочка.
    *   *Кнопка:* "Понятно".
