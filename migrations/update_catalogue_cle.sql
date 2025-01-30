-- Update existing rows to have a default value for the brand column
UPDATE "catalogue_cle" SET "brand" = 'default_brand' WHERE "brand" IS NULL;

-- Alter the table to make the brand column non-nullable
ALTER TABLE "catalogue_cle" ALTER COLUMN "brand" SET NOT NULL;
