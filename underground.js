let player = {
	name: "Путник",
	hp: 100,
	attack: 10,
	magic: 20,
	mana: 100, healthpotions: 5,
	manapotions: 3,
	coins: 0,
	weaponPrice: 20,
}
let training = { name: "Манекен", hp: 50, attack: 0 }
let zombie = { name: "Зомби", hp: 25, attack: 5 }
let skeleton = { name: "Скелет", hp: 15, attack: 15 }
let warvor = { name: "Варвор", hp: 35, attack: 10 }
let wizard = { name: "Волшебник", hp: 20, attack: 20, manabreak: 15 }
let boss = { name: "Лорд Скелетов", hp: 50, attack: 15 }

const achivments = [
	{ name: "Безучастный", desc: "Вы ушли не взглянув назад. Тишина - ваш щит.", unlocked: false },
	{ name: "Бросить деревню", desc: "Вы не хотели заморачиваться и просто ушли.", unlocked: false },
	{ name: "Дом вас не принял", desc: "Попытаться уйти домой - но дверь закрыта. Пути назад нету.", unlocked: false },
	{ name: "Вы прошли обучение", desc: "Убить маникена, до входа в подземелье", unlocked: false },
	{ name: "Вы погибли..", desc: "Погибнуть в бою. Деревня вас ждала как героя.. но герой не пришел.", unlocked: false },
	{ name: "Конец", desc: "Вы победили главного босса.", unlocked: false }
]

const { styleText } = require('node:util');

const checkEnemyHp = () => {
	if (currentEnemy.hp <= 0) {
		currentEnemy.hp = 0
		return true
	}
	return false
}

const getCoin = (a) => {
	if (checkEnemyHp()) {
		player.coins += a
		console.log(styleText('green', `Вы получили ${a} монет! Всего: ${player.coins}`))
	}
}


const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const unlockAchivment = (i) => {
	const achu = achivments[i]
	if (achu.unlocked) {
		console.log(`\n${achu.name} - уже разблокировано`)
		return
	}
	achu.unlocked = true
	console.log(`\x1b[33m✅ ${achivments[i].name} - разблокировано.\x1b[0m`)
}

const showAch = () => {
	achivments.forEach((ach, i) => {
		const status = ach.unlocked ? '✅' : '🔒'
		console.log(styleText('yellow', `${i + 1}. ${status} ${ach.name} - ${ach.desc}`))
	})
}

// ============

const mainMenu = () => {
	console.log(styleText(['cyan', 'bold'], '=== ИГРА ПУТНИК: ПОДЗЕМЕЛЬЕ ==='));
	console.log(styleText('blue', '1 - Начать новую игру'));
	console.log(styleText('blue', '2 - Достижения'));
	console.log(styleText('blue', '3 - Выйти\n'));


	rl.question("Выберите ваше действие: ", (menu) => {
		menu = menu.toLowerCase()

		if (menu === "1") {
			resetGame()
			intro()
		} else if (menu === "2") {
			console.log("Достижения:");
			showAch()
			console.log()
			mainMenu()
		} else if (menu === "3") {
			console.log(styleText('red', "До встречи путник.."))
			rl.close()
		} else {
			console.log(styleText('red', "Неверный выбор."))
			mainMenu()
		}
	})
}

function resetGame() {
	player.hp = 100
	player.mana = 100
	player.healthpotions = 5
	player.manapotions = 3
	player.coins = 0

	training.hp = 50
	zombie.hp = 25
	skeleton.hp = 15
	warvor.hp = 35
	wizard.hp = 20
	boss.hp = 50

	currentEnemy = training
}


function intro() {
	console.log("Вы идёте по тихому лесу, Солнце скоро скроется за горами, птицы уже замолкли")
	console.log("На улице так спокойно, и тепло\n")
	console.log("Вдруг - вы слышите крик где-то впереди: ПОМОГИТЕ!!!\n")

	rl.question("Ваши действия: (w - бежать на крик, s - отвернуться и пойти домой): ", (choise) => {
		choise = choise.toLowerCase()

		if (choise === "s") {
			console.log("\nВы решили что это не ваше дело.")
			console.log("Повернувшись назад, вы быстро уходите домой.")
			unlockAchivment(0)
			mainMenu()
		} else if (choise === "w") {
			console.log("Вы бросаетесь бежать на крик - сердце стучит, как барабан...\n")
			console.log("Вы вспоминаете слухи: «Нежить напала на поселение..» ")
			console.log("Люди в панике указывают на вход в подземелье.\n")
			console.log("Главный кладёт вам руку на плечо")
			console.log("- Путник.. у нас есть немного запасов еды и зелья. Отдохните. Силы вам понадобятся")
			console.log("Вы соглашаетесь. Закрыв глаза вы засыпаете под шум тревожного шепота...")

			setTimeout(afterRest, 3000)
		} else {
			console.log(styleText('red', 'Неизвестная команда. Попробуйте позже.'));
			intro()
		}
	})

	function afterRest() {
		console.log("\nВы просыпаетесь оттого, что вас кто-то трясет")
		console.log("Перед тем как вы пойдете в подземелье давайте вы поучитесь на маникене")
		console.log("Главный смотрит на вас надежой - и страхом.\n")

		rl.question("Ваши действия: (y - отточить свои навыки и пойти в подземелье, n - отвернуться и пойти домой): ", (goto) => {
			goto = goto.toLowerCase()

			if (goto === "y") {
				console.log("Вы глубоко вздыхаете, берете меч и идете к манекену")
				training()
			} else if (goto === "n") {
				console.log("Вы резко вскочили с кровати, открыли дверь и начали бежать.")
				console.log("- Постойте! - кричит вам главный но вы не оглядываетесь\n")

				// Шанс на то что войдет
				const Allowed = Math.random() < 0.4;

				if (Allowed) {
					console.log("Вы подходите к дому открываете ручку и заходите внутрь")
					console.log("Вы садитесь на диван, лежите и думаете..")
					console.log("Как вдруг...\n")
					console.log("*ВЗРЫВ!*")
					unlockAchivment(1)
					mainMenu()
					return
				} else {
					console.log("Вы как всегда подходите к своему дому дергаете ручку, закрыто")
					unlockAchivment(2)
					console.log("Из-за двери шепот - вы должны помочь деревне...\n")
					console.log("Вы бежите к деревне..")
					console.log("Мы знали что вы вернетесь! - Главный")
					console.log("Взяв меч вы идете в подземелье.\n")
					console.log("Вы идете по первому этажу подземелья...")
					console.log("Вдруг из за угла выпрыгивает зомби")
					turn()
				}

			}
		})
	}

	const buyWeapon = () => {
		if (player.coins >= player.weaponPrice) {
			player.coins -= player.weaponPrice

			player.attack += 5

			console.log('Успешно! Урон будет увеличен.')
			return true
		} else {
			console.log(`Не хватает монет. Нужно: ${player.weaponPrice}`)
			return false
		}
	}

	const shop = () => {
		console.log(styleText('blue', '1 - Купить новый меч (20 золота)'));
		console.log(styleText('blue', '2 - Вернуться обратно в подземелье'));

		rl.question("Выберите ваше действие: ", (theShop) => {
			theShop = theShop.toLowerCase()

			if (theShop === "1") {
				if (buyWeapon) {
					currentEnemy = warvor
					console.log("Купив новый меч, вы идете обратно в подземелье\n");
					turn()
				} else {
					shop()
				}

			} else if (theShop === "2") {
				console.log("Идем обратно в подземелье\n");
				turn()
			} else {
				console.log(styleText('red', "Неверный выбор."))
				shop()
			}
		})
	}

	// Основной геймплей
	function training() {
		console.log(styleText('cyan', `Ваше здоровье: ${player.hp} | Ваша мана: ${player.mana} | Зелий здоровья: ${player.healthpotions} | Зелий маны: ${player.manapotions} `))
		console.log(styleText('green', `HP врага: ${currentEnemy.hp}\n`))

		rl.question("Действие (a - атака, s - лечиться, d - попытка побега, f - атака магией, q - восстановить ману): ", (ans) => {
			ans = ans.toLowerCase()

			if (ans === "a") {
				const dmg = Math.floor(Math.random() * player.attack) + 1
				currentEnemy.hp -= dmg
				console.log(`\x1b[1; 32m Вы ударили ${currentEnemy.name} на ${dmg} урона! \x1b[0m`)

				if (checkEnemyHp()) {
					console.log(styleText('green', `ГОЙДА! Вы убили ${currentEnemy.name}!`))
					getCoin(10)
					console.log(`Вы прошли обучение.`)
					console.log(`- Путник вы достойны защищать нашу деревню вперед в подземелье!`)
					unlockAchivment(3)

					currentEnemy = zombie

					console.log("Вы идете по первому этажу подземелья...")
					console.log("Вдруг из за угла выпрыгивает зомби\n")
					turn()
				}

			} else if (ans === "s") {
				if (player.hp > 85) {
					console.log(`\x1b[1; 32m Вам нет необходимости лечиться вы перед манекеном \x1b[0m`)
				}

			} else if (ans === "d") {
				if (currentEnemy == training) {
					console.log("Вы сбежали с поля боя...")
					console.log("Деревня разочарована в вас и будет ждать нового героя, если их конечно не убьют")
					mainMenu()
					return
				}
			} else if (ans === "f") {
				if (player.mana >= 25) {
					const dmg = Math.floor(Math.random() * player.magic) + 1
					currentEnemy.hp -= dmg;
					player.mana -= 25
					console.log(`\x1b[1; 32m Вы ударили магией ${currentEnemy.name} на ${dmg} урона! \x1b[0m`)
				} else {
					console.log(`\x1b[1; 32m У вас недостаточно маны на заклинание \x1b[0m`)
				}
			} else if (ans === "q") {
				if (player.mana > 75) {
					console.log(`\x1b[1; 32m У вас слишком много маны, вы не можете выпить зелье \x1b[0m`)
				} else if (player.manapotions > 0) {
					const heal = 30
					player.mana += heal
					player.manapotions--
					console.log(`\x1b[1; 32m Вы выпили зелье и восстановили ${heal} маны! \x1b[0m`)
				} else {
					console.log(`\x1b[1; 32m У вас больше нет зелий! \x1b[0m`)
				}
			} else {
				console.log(`\x1b[1; 32m Неизвестная команда! \x1b[0m`)
			}
			training()
			return
		})
	}

	function turn() {
		console.log(styleText('cyan', `Ваше здоровье: ${player.hp} | Ваша мана: ${player.mana} | Зелий здоровья: ${player.healthpotions} | Зелий маны: ${player.manapotions} `))
		console.log(styleText('red', `Текущий враг: ${currentEnemy.name} `))
		console.log(`HP врага: ${currentEnemy.hp}\n`)

		rl.question("Действие (a - атака, s - лечиться, d - попытка побега, f - атака магией, q - восстановить ману): ", (ans) => {
			ans = ans.toLowerCase()

			if (ans === "a") {
				const dmg = Math.floor(Math.random() * player.attack) + 1
				currentEnemy.hp -= dmg
				console.log(`\x1b[1; 32m Вы ударили ${currentEnemy.name} на ${dmg} урона! \x1b[0m`)

			} else if (ans === "s") {
				if (player.hp > 85) {
					console.log(`\x1b[1; 32m У вас слишком много хп, вы не можете выпить зелье \x1b[0m`)
				} else if (player.healthpotions > 0) {
					const heal = 15
					player.hp += heal
					player.healthpotions--
					console.log(`\x1b[1; 32m Вы выпили зелье и восстановили ${heal} HP! \x1b[0m`)
				} else {
					console.log(`\x1b[1; 32m У вас больше нет зелий! \x1b[0m`)
				}

			} else if (ans === "d") {
				if (currentEnemy == warvor) {
					console.log("Из-за неповоротливости варвора, вы успеваете сбежать")
					console.log("Деревня разочарована в вас и будет ждать нового героя, если их конечно не убьют")
					mainMenu()
					return
				}
				if (currentEnemy == boss) {
					console.log("Вы в ужасе убегаете назад, но дверь, ведущая в зал, оказалось закрытой")
					console.log("Вы разворачиваетесь, но не успев обернуться, Лорд Скелетов разрубает вам голову")
					console.log("Вы погибли...")
					mainMenu()
					return
				}
				if (currentEnemy == wizard) {
					console.log("Вы попытались сбежать, но из длинного коридора не убежишь")
					console.log("Маг убил вас дальними заклинаниями")
					console.log("Вы погибли...")
					mainMenu()
					return
				}
				if (currentEnemy == skeleton) {
					console.log("Вы сбежали, но скелет ранил вас в ногу")
					console.log("Деревня разочарована в вас и будет ждать нового героя, если их конечно не убьют")
					mainMenu()
					return
				}
				console.log("Вы сбежали с поля боя...")
				console.log("Деревня разочарована в вас и будет ждать нового героя, если их конечно не убьют")
				mainMenu()
				return
			} else if (ans === "f") {
				if (player.mana >= 25) {
					const dmg = Math.floor(Math.random() * player.magic) + 1
					currentEnemy.hp -= dmg;
					player.mana -= 25
					console.log(`\x1b[1; 32m Вы ударили магией ${currentEnemy.name} на ${dmg} урона! \x1b[0m`)
				} else {
					console.log(`\x1b[1; 32m У вас недостаточно маны на заклинание \x1b[0m`)
				}
			} else if (ans === "q") {
				if (player.mana > 75) {
					console.log(`\x1b[1; 32m У вас слишком много маны, вы не можете выпить зелье \x1b[0m`)
				} else if (player.manapotions > 0) {
					const heal = 30
					player.mana += heal
					player.manapotions--
					console.log(`\x1b[1; 32m Вы выпили зелье и восстановили ${heal} маны! \x1b[0m`)
				} else {
					console.log(`\x1b[1; 32m У вас больше нет зелий! \x1b[0m`)
				}
			} else if (ans === "bastart") {
				player.hp = 1000
				player.mana = 1000
				console.log(`\x1b[1; 32m Вы ввели секретный Конами код, вы получаете 1000 хп и 1000 маны \x1b[0m`)
			} else if (ans === "kill") {
				player.hp = 0
			} else {
				console.log(`\x1b[1; 32m Неизвестная команда! \x1b[0m`)
				turn()
			}

			if (currentEnemy.hp > 0) {
				const dmg = Math.floor(Math.random() * currentEnemy.attack) + 1
				player.hp -= dmg;
				player.hp = Math.max(0, player.hp)
				console.log(`\x1b[1; 32m ${currentEnemy.name} ударил вас на ${dmg} урона! \x1b[0m`)

				if (currentEnemy == wizard) {
					if (currentEnemy.hp > 0) {
						if (player.mana > 10) {
							const dmg = Math.floor(Math.random() * currentEnemy.manabreak) + 1
							player.mana -= dmg
							console.log(`\x1b[1; 32m ${currentEnemy.name} выжег у вас ${dmg} маны! \x1b[0m`)
						}
					}
				}
				if (player.hp <= 0) {
					console.log(`\x1b[1; 32m Вы погибли... \x1b[0m`)
					unlockAchivment(4)
					mainMenu()
					return
				}
			}
			if (checkEnemyHp()) {
				console.log(styleText('green', `ГОЙДА! Вы убили ${currentEnemy.name}!`))
				getCoin(10)

				if (currentEnemy.name === "Зомби") {
					console.log("Вы спускаетесь дальше по коридору")
					console.log("Но когда вы спустились, сзади на вас напал Скелет!")
					currentEnemy = skeleton
					turn()
					return
				}
				else if (currentEnemy.name === "Скелет") {
					console.log("Скелет упал и рассыпался в пыль")
					console.log("Вы спускаетесь на второй этаж подземелья")
					console.log("Спустившись на следующий этаж вы слышите тяжелые шаги - из комнаты вышел Варвор!")


					rl.question("Хотите зайти в магазин перед спуском на 2 этаж? (y/n) ", choice => {
						if (choice.toLowerCase() === 'y') {
							shop()
						} else {
							currentEnemy = warvor
							turn()
						}
					})
					return
				}
				else if (currentEnemy.name === "Варвор") {
					console.log("Варвар пал")
					console.log("Вы спускаетесь на третий этаж подземелья")
					console.log("Спустившись вы попадаете на длинный коридор, а в конце стоит злой волшебник!")
					currentEnemy = wizard
					turn()
					return
				}
				else if (currentEnemy.name === "Волшебник") {
					console.log("Волшебник пал")
					console.log("Вы спускаетесь на четвертый этаж подземелья")
					console.log("В глубине зала засветились два красных глаза...")
					currentEnemy = boss
					turn()
					return
				}
				else if (currentEnemy.name === "Лорд Скелетов") {
					console.log("Лорд Скелетов рухнул. Поселение спасено!")
					console.log("Вы вернулись обратно в деревню - люди вам аплодируют!")
					console.log("Вы - герой!")
					unlockAchivment(5)
					mainMenu()
					return
				}
			}


			console.log()
			turn()
		})
	}
}


mainMenu()