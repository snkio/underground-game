let player = { name: "Путник", hp: 100, attack: 10, magic: 20, mana: 100, healthpotions: 5, manapotions: 3 }
let zombie = { name: "Зомби", hp: 25, attack: 5 }
let skeleton = { name: "Скелет", hp: 15, attack: 15 }
let warvor = { name: "Варвор", hp: 35, attack: 10 }
let wizard = { name: "Волшебник", hp: 20, attack: 20, manabreak: 15 }
let boss = { name: "Лорд Скелетов", hp: 50, attack: 15 }

const achivments = [
	{ name: "Безучастный", desc: "Вы ушли не взглянув назад. Тишина - ваш щит.", unlocked: false },
	{ name: "Бросить деревню", desc: "Вы не хотели заморачиваться и просто ушли.", unlocked: false },
	{ name: "Дом вас не принял", desc: "Попытаться уйти домой - но дверь закрыта. Пути назад нету.", unlocked: false },
	{ name: "Конец", desc: "Вы победили главного босса.", unlocked: false },
	{ name: "Вы погибли..", desc: "Погибнуть в бою. Деревня вас ждала как героя.. но герой не пришел.", unlocked: false }
]

let currentEnemy = zombie

const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// АНЛОКИ И ТД

function unlockAchivment(index) {
	achivments[index].unlocked = true
	console.log(`\x1b[33m✅ ${achivments[index].name} - разблокировано.\x1b[0m`)
}


function showAch() {
	for (let i = 0; i < achivments.length; i++) {
		const ach = achivments[i]
		const status = ach.unlocked ? '✅' : '🔒'
		console.log(`${i + 1}. ${status} ${ach.name} - ${ach.desc}`)
	}
}

// ============

function mainMenu() {
	console.log("=== ИГРА ПУТНИК: ПОДЗЕМЕЛЬЕ ===")
	console.log("1 - Начать новую игру")
	console.log("2 - Достижения")
	console.log("3 - Выйти")
	console.log()

	rl.question("Выберите ваше действие: ", (menu) => {
		menu = menu.toLowerCase()

		if (menu === "1") {
			resetGame()
			intro()
		} else if (menu === "2") {
			console.log("Достижения:");
			// console.log("achivments", achivments)
			showAch()
			console.log()
			mainMenu()
		} else if (menu === "3") {
			console.log("До встречи путник..")
			rl.close()
		} else {
			console.log("Неверный выбор.")
			mainMenu()
		}
	})
}

function resetGame() {
	player.hp = 100
	player.mana = 100
	player.healthpotions = 100
	player.manapotions = 3

	zombie.hp = 25
	skeleton.hp = 15
	warvor.hp = 35
	wizard.hp = 20
	boss.hp = 50

	currentEnemy = zombie
}

function intro() {
	console.log("Вы идёте по тихому лесу, Солнце скоро скроется за горами, птицы уже замолкли")
	console.log("На улице так спокойно, и тепло")
	console.log()
	console.log("Вдруг - вы слышите крик где-то впереди: ПОМОГИТЕ!!!")
	console.log()

	rl.question("Ваши действия: (w - бежать на крик, s - отвернуться и пойти домой) ", (choise) => {
		choise = choise.toLowerCase()

		if (choise === "s") {
			console.log()
			console.log("Вы решили что это не ваше дело.")
			console.log("Повернувшись назад, вы быстро уходите домой.")
			unlockAchivment(0)
			mainMenu()
		} else if (choise === "w") {
			console.log()
			console.log("Вы бросаетесь бежать на крик - сердце стучит, как барабан...")
			console.log()
			console.log("Вы вспоминаете слухи: «Нежить напала на поселение..» ")
			console.log("Люди в панике указывают на вход в подземелье.")
			console.log()
			console.log("Главный кладёт вам руку на плечо")
			console.log("- Путник.. у нас есть немного запасов еды и зелья. Отдохните. Силы вам понадобятся")
			console.log("Вы соглашаетесь. Закрыв глаза вы засыпаете под шум тревожного шепота...")

			setTimeout(afterRest, 3000)
		} else {
			console.log("Неизвестная команда. Попробуйте позже.")
			intro()
		}
	})

	function afterRest() {
		console.log()
		console.log("Вы просыпаетесь оттого, что вас кто-то трясет")
		console.log("- Путник.. время пришло. Подземелье вас ждёт!")
		console.log("Главный смотрит на вас надежой - и страхом.")
		console.log()
		console.log("Ваше сердце колотиться. Вы чувствуете: «Я могу еще сбежать.. пока не поздно»")
		console.log()

		rl.question("Ваши действия: (y - идти в подземелье, n - отвернуться и пойти домой) ", (goto) => {
			goto = goto.toLowerCase()

			if (goto === "y") {
				console.log("Вы глубоко вдыхаете, берете меч и шагаете ко входу")
				console.log("Вы идете по первому этажу подземелья...")
				console.log()
				console.log("Вдруг из за угла выпрыгивает зомби")
				turn()
			} else if (goto === "n") {
				console.log("Вы резко вскочили с кровати, открыли дверь и начали бежать.")
				console.log("- Постойте! - кричит вам главный но вы не оглядываетесь")
				console.log()

				const Allowed = Math.random() < 0.4;

				if (Allowed) {
					console.log("Вы подходите к дому открываете ручку и заходите внутрь")
					console.log("Вы садитесь на диван, лежите и думаете..")
					console.log("Как вдруг...")
					console.log()
					console.log("*ВЗРЫВ!*")
					unlockAchivment(1)
					mainMenu()
					return
				} else {
					console.log("Вы как всегда подходите к своему дому дергаете ручку, закрыто")
					achivments.locked_door.unlocked = true
					console.log("\x1b[33m Вы разблокировали достижение: «Дом вас не принял» \x1b[0m")
					console.log("Из-за двери шепот - вы должны помочь деревне...")
					console.log()
					console.log("Вы бежите к деревне..")
					console.log("Мы знали что вы вернетесь! - Главный")
					console.log("Взяв меч вы идете в подземелье.")
					console.log()
					console.log("Вы идете по первому этажу подземелья...")
					console.log("Вдруг из за угла выпрыгивает зомби")
					turn()
				}

			}
		})
	}

	function turn() {
		console.log(`Ваше здоровье: ${player.hp} | Ваша мана: ${player.mana} | Зелий здоровья: ${player.healthpotions} | Зелий маны: ${player.manapotions} `)
		console.log(`HP врага: ${currentEnemy.hp} `)
		console.log()
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
					achivments.died.unlocked = true
					console.log("\x1b[33m Вы разблокировали достижение: «Погибнуть на поле боя» \x1b[0m")
					mainMenu()
					return
				}
			}
			if (currentEnemy.hp <= 0) {
				console.log(`\x1b[1; 32m ГОЙДА! Вы убили ${currentEnemy.name} ! \x1b[0m`)

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
					currentEnemy = warvor
					turn()
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
					achivments.theend.unlocked = true
					console.log("\x1b[33m Вы разблокировали достижение: «Конец» \x1b[0m")
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