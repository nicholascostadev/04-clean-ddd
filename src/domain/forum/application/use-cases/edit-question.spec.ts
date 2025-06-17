import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedException } from "./exceptions/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to edit a question", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityId("author-1"),
			slug: Slug.create("example-question"),
		});

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			authorId: "author-1",
			questionId: newQuestion.id.toString(),
			title: "New title",
			content: "New content",
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.items).toHaveLength(1);
		expect(inMemoryQuestionsRepository.items[0]).toEqual(
			expect.objectContaining({
				title: "New title",
				content: "New content",
			}),
		);
	});

	it("should not be able to edit a question from another user", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityId("author-1"),
		});

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			authorId: "author-2",
			questionId: newQuestion.id.toString(),
			title: "New title",
			content: "New content",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedException);
	});
});
