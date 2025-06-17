import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedException } from "./exceptions/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to edit an answer", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityId("author-1"),
		});

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			authorId: "author-1",
			answerId: newAnswer.id.toString(),
			content: "New content",
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryAnswersRepository.items).toHaveLength(1);
		expect(inMemoryAnswersRepository.items[0]).toEqual(
			expect.objectContaining({
				content: "New content",
			}),
		);
	});

	it("should not be able to edit an answer from another user", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityId("author-1"),
		});

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			authorId: "author-2",
			answerId: newAnswer.id.toString(),
			content: "New content",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedException);
	});
});
