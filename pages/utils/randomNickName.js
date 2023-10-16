// randomNicknameGenerator.js

const adjectives = ['快乐的', '聪明的', '勇敢的', '热情的', '友好的', '幸运的', '美丽的', '慷慨的', '可爱的', '机智的'];
const nouns = ['小猫咪', '光宝贝', '独角兽', '小丸子', '梦幻旅人', '音乐控', '飞行员', '幸福种子', '舞者', '微笑天使', "天龙王"];

export function getRandomNickname() {
	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
	return randomAdjective + randomNoun;
}
