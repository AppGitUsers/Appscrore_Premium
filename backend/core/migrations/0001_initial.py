from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Lead',
            fields=[
                ('id',         models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name',       models.CharField(max_length=255)),
                ('email',      models.EmailField(max_length=254)),
                ('phone',      models.CharField(blank=True, max_length=20, null=True)),
                ('company',    models.CharField(blank=True, max_length=255, null=True)),
                ('service',    models.CharField(blank=True, max_length=100, null=True)),
                ('budget',     models.CharField(blank=True, max_length=100, null=True)),
                ('timeline',   models.CharField(blank=True, max_length=100, null=True)),
                ('message',    models.TextField()),
                ('is_read',    models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
