import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});

	it("should be able to answer a question", async () => {
		const result = await sut.execute({
			questionId: "1",
			instructorId: "1",
			content: "Nova resposta",
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryAnswersRepository.items).toHaveLength(1);
		expect(inMemoryAnswersRepository.items[0].id).toBe(result.value?.answer.id);
	});
});
